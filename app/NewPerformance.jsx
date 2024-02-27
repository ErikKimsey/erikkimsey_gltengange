import { useState } from "react";
import WebcamRecorder from "./WebcamRecorder";

const NewPerformance = ({ constraints }) => {

    const [title, setTitle] = useState(null);

    return (
        <div className="flex-col w-full p-4 border rounded-md">
            {/*  */}
            <div className="header-input-container flex-col p-4">
                <div>CREATE A NEW PERFORMANCE</div>
                <input
                    className="w-full h-10 pl-2 text-gray-700"
                    placeholder="performance title"
                />
            </div>
            {/*  */}
            <div className="video-recorder-container flex-col p-4">
                <WebcamRecorder />
            </div>
        </div>
    );
};

export default NewPerformance;
