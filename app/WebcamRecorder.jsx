"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import Webcam from "react-webcam";

const mimeType = "video/webm;codecs=vp8";

export default function WebcamRecorder({ constraints, handleRecordedVideo }) {

    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    // 
    const handleStartRecord = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    //
    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    //
    const handleStopRecord = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    //
    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            handleRecordedVideo(blob);

            // 
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    return (
        <div className="flex">
            {/* <Webcam videoConstraints={constraints} /> */}
            <Webcam audio={false} ref={webcamRef} videoConstraints={constraints} />
            {capturing ? (
                <button onClick={handleStopRecord}>Stop Capture</button>
            ) : (
                <button onClick={handleStartRecord}>Start Capture</button>
            )}
            {recordedChunks.length > 0 && (
                <button onClick={handleDownload}>Keep Recording</button>
            )}
        </div>
    )
}