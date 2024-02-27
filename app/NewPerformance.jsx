import { useState } from "react";
import WebcamRecorder from "./WebcamRecorder";

const NewPerformance = ({ constraints }) => {

    const [title, setTitle] = useState(null);
    const [timestamp, setTimestamp] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState(null);

    const handleRecordedVideo = (val) => {
        setRecordedVideo(val);
    }


    return (
        <div className="flex-col w-full p-4 border rounded-md">
            {/*  */}
            <div className="header-input-container flex-col p-4">
                <div>CREATE A NEW PERFORMANCE</div>
                <input
                    className="w-full h-10 pl-2 text-gray-700"
                    placeholder="performance title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            {/*  */}
            <div className="video-recorder-container flex-col p-4">
                <WebcamRecorder handleRecordedVideo={handleRecordedVideo} />
            </div>
        </div>
    );
};

export default NewPerformance;
