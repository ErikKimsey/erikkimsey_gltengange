"use client";
import { useState, useEffect } from "react";
import {
  AddCircle,
  Delete,
  Edit,
  PlayCircleOutline,
} from "@mui/icons-material";

export default function VideoList(props) {
  let [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(["dddddd", "eeeeee"]);
  }, []);

  return (
    <div className="flex-col w-full justify-between">
      <h1 className="className">Performances</h1>
      {videos.map((e, i) => (
        <Performance key={i} video={e} />
      ))}
    </div>
  );
}

export const Performance = (props) => {
  let { video } = props;
  return (
    <div className="flex w-full border border-white rounded-lg bg-white justify-between p-2 my-2 border-box">
      <div className="flex-col justify-items-center items-center">
        <div className="text-gray-400 w-32 h-32 p-2 bg-black text-center">
          THUMBNAIL
        </div>
        <div className="text-gray-500 text-sm text-center">DURATION</div>
      </div>
      {/*  */}
      <div className="flex-col justify-center px-2">
        <div className="flex h-full ">
          <div className="flex-col w-full">
            <div className="flex flex-wrap w-full justify-between">
              <div className="text-blue-800 font-medium text-2xl pr-4">
                PERFORMANCE TITLE
              </div>
              <div className="modify-btns-container flex justify-center text-blue-500">
                <button className="px-1">
                  <PlayCircleOutline />
                </button>
                <button className="pl-1">
                  <Edit />
                </button>
                <button className="px-1">
                  <Delete />
                </button>
              </div>
            </div>
            <div className="text-gray-400">DATE</div>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

// {videoUrl, title} = props:
function VideoListItem(props) {
  console.log(props.video);
  return (
    <div className="flex-col p-2 w-full">
      <div>Video Title</div>
      <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
      <div className="flex justify-around p-2 ">
        <button className="hover:bg-pink-700 border-2 border-gray-600 text-white font-bold py-2 px-4 rounded">
          Play
        </button>
        <button className="hover:bg-pink-700 border-2 border-gray-600 text-white font-bold py-2 px-4 rounded">
          Stop
        </button>
        <button className="hover:bg-pink-700 border-2 border-gray-600 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </div>
    </div>
  );
}
