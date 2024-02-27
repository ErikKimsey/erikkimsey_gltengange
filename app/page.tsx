"use client";
import { useState, useEffect } from "react";
import VideoRecorder from "./VideoRecorder";
import VideoList, { Performance } from "./VideoList";
import NewPerformance from "./NewPerformance";
import { createClient } from "@supabase/supabase-js";
import WebcamRecorder from './WebcamRecorder';

// Create a single supabase client for interacting with your database
const supabaseUrl = "https://bzptobpslgnpwelhfors.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cHRvYnBzbGducHdlbGhmb3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3MzY3NjQsImV4cCI6MjAyNDMxMjc2NH0.VBblFJ81yZVWNWCVxG4IVa4YHKDIrCOEXV6-5sB1F6Y";

import {
    AccessAlarm,
    ThreeDRotation,
    AddCircle,
    Delete,
    Edit,
    CameraAlt,
    Camera,
    VideocamOff,
    Videocam,
} from "@mui/icons-material";

const mimeType = "audio/webm";

export async function Videos() {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: notes } = await supabase.from("videos").select();
    return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

export default function Home() {

    const [vidConstraints, setVidConstraints] = useState({});

    useEffect(() => {
        const constraints = {
            facingMode: "user"
        }
        setVidConstraints(constraints);
    }, [])


    /** App Flow: */
    // 1. Get recordings from persistent storage,
    // 2. Send recordings from state to VideoList conmponent and display list,
    //
    // 3. Create component to add new recordings ("plus button" that navigates or opens NewPerformance component)
    // 4. NewPerformance:
    // -- a. local state for:
    // -------- recording title,
    // -------- recording audio,
    // -------- recording video,
    // -------- recording description,
    // -------- recording timestamp,

    // Handling Recording:
    // -- Some state/context api to hold the recording
    // -- or...  set recording to localstorage
    // -- or...  set recording to supabase
    const [recording, setRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);

    //   useEffect(() => {
    //     const fetchRecordings = async () => {
    //       const { data } = await supabase.from("recordings").select();
    //       setRecordings(data);
    //     };
    //     fetchRecordings();
    //   }, []);

    return (
        <main className="flex flex-col items-center max-w-[600px] w-full min-w-96 p-6">
            {vidConstraints && <NewPerformance constraints={vidConstraints} />}
            {/* Video playback component */}
            {/* <Performance /> */}
            {/* <Videos /> */}
            {/* <div className="flex menu">
        <button className="hover:text-pink-400 active:text-pink-600 hover:scale-125">
          <AddCircle />
        </button>
        <button className="hover:text-pink-400 active:text-pink-600 hover:scale-125">
          <Delete />
        </button>
        <button className="hover:text-pink-400 active:text-pink-600 hover:scale-125">
          <Edit />
        </button>
        <button className="hover:text-pink-400 active:text-pink-600 hover:scale-125">
          <VideocamOff />
        </button>
        <button className="hover:text-pink-400 active:text-pink-600 hover:scale-125">
          <Videocam />
        </button>
      </div> */}
            <NewPerformance />
            <VideoList />
        </main>
    );
}
