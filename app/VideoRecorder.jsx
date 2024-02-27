"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddCircle, Delete, Edit } from "@mui/icons-material";

// video/mp4; codecs="avc1.424028, mp4a.40.
const mimeType = 'video/mp4';

export default function VideoRecorder() {
    let [isRecording, setIsRecording] = useState(false);
    const [permission, setPermission] = useState(false);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [theBlob, setTheBlob] = useState(null);

    const mediaRecorder = useRef(null);
    const liveVideoFeed = useRef(null);

    // Permission to use Camera
    const getCameraPermission = async () => {
        setRecordedVideo(null);
        //get video and audio permissions and then stream the result media stream to the videoSrc variable
        if ("MediaRecorder" in window) {
            try {
                const videoConstraints = {
                    audio: true,
                    video: true,
                };
                const audioConstraints = { audio: true };

                // create audio and video streams separately
                const audioStream =
                    await navigator.mediaDevices.getUserMedia(audioConstraints);
                const videoStream =
                    await navigator.mediaDevices.getUserMedia(videoConstraints);

                setPermission(true);

                //combine both audio and video streams

                const combinedStream = new MediaStream([
                    ...videoStream.getVideoTracks(),
                    ...audioStream.getAudioTracks(),
                ]);

                setStream(combinedStream);

                //set videostream to live feed player
                liveVideoFeed.current.srcObject = videoStream;
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    //   console.log("init recording");

    //   navigator.mediaDevices
    //     .getUserMedia({
    //       video: true,
    //       audio: true,
    //     })
    //     .then((stream) => {
    //       preview.srcObject = stream;
    //       downloadButton.href = stream;
    //       preview.captureStream =
    //         preview.captureStream || preview.mozCaptureStream;
    //       return new Promise((resolve) => (preview.onplaying = resolve));
    //     })
    //     .then(() => startRecording(preview.captureStream(), recordingTimeMS))
    //     .then((recordedChunks) => {
    //       let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    //       recording.src = URL.createObjectURL(recordedBlob);
    //       downloadButton.href = recording.src;
    //       downloadButton.download = "RecordedVideo.webm";

    //       log(
    //         `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`,
    //       );
    //     })
    //     .catch((error) => {
    //       if (error.name === "NotFoundError") {
    //         log("Camera or microphone not found. Can't record.");
    //       } else {
    //         log(error);
    //       }
    //     });
    // };

    const startRecording = async () => {
        setRecordingStatus("recording");

        const media = new MediaRecorder(stream);

        mediaRecorder.current = media;
        mediaRecorder.current.start();

        let localVideoChunks = [];

        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localVideoChunks.push(event.data);
        };
        liveVideoFeed.current.srcObject = videoStream;
        setVideoChunks(localVideoChunks);
    };

    // stop recording
    const stopRecording = () => {
        setPermission(false);
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();

        mediaRecorder.current.onstop = () => {
            const videoBlob = new Blob(videoChunks, { type: mimeType });
            const videoUrl = URL.createObjectURL(videoBlob);

            setRecordedVideo(videoUrl);

            setVideoChunks([]);
        };
    };

    const download = () => {
        const blob = new Blob(recordedChunks, {
            type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = "test.webm";
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="flex-col h-full w-full p-2 justify-center items-end rounded-md bg-pink-700">
            {!recordedVideo ? (
                <video
                    ref={liveVideoFeed}
                    className="w-full live-player bg-black"
                ></video>
            ) : null}
            {recordedVideo ? (
                <div className="recorded-player">
                    <video
                        className="w-full recorded bg-blue-300"
                        src={recordedVideo}
                        controls
                    ></video>
                    <a download href={recordedVideo}>
                        Download Recording
                    </a>
                </div>
            ) : null}
            {/* <main> */}
            <div className="flex justify-end items-center p-4 bg-emerald-300">
                {!permission ? (
                    <button
                        onClick={getCameraPermission}
                        type="button"
                        className="h-10 bg-pink-500 hover:bg-pink-700 p-2 rounded-md"
                    >
                        Allow Camera
                    </button>
                ) : null}

                {permission && recordingStatus === "inactive" ? (
                    <button
                        onClick={startRecording}
                        type="button"
                        className="bg-pink-500 hover:bg-pink-700 p-2 rounded-md"
                    >
                        Start Recording
                    </button>
                ) : null}

                {recordingStatus === "recording" ? (
                    <button
                        onClick={stopRecording}
                        type="button"
                        className="bg-pink-500 hover:bg-pink-700 p-2 rounded-md"
                    >
                        Stop Recording
                    </button>
                ) : null}
            </div>
            {/*  */}
            {/* </main> */}



            {/* <div className="flex-col h-full preview">
        <video
          // id="preview"
          width="460"
          height="220"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          controls
        ></video>
        <AddDeleteEdit />
        <div className="flex p-2 justify-between">
          <button
            onClick={initRecording}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Start Recording
          </button>
          <button
            onClick={initRecording}
            class="border-2 hover:border-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div> */}

            {/* <div className="preview">
        <video id="preview" width="460" height="220" autoplay muted></video>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Revioew Recording
        </button>
      </div> */}
        </div>
    );
}

function AddDeleteEdit() {
    return (
        <div className="flex menu w-full justify-around p-2">
            <button className="hover:text-pink-400 active:text-pink-600 hover:scale-110">
                <AddCircle />
            </button>
            <button className="hover:text-pink-400 active:text-pink-600 hover:scale-110">
                <Delete />
            </button>
            <button className="hover:text-pink-400 active:text-pink-600 hover:scale-110">
                <Edit />
            </button>
        </div>
    );
}
