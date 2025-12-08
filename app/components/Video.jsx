"use client";
import { useState } from "react";
import Image from "next/image";
import { BiCaretRightSquare, BiCaretLeftSquare } from "react-icons/bi";

const Video = () => {
  const [video, setVideo] = useState([]);
  // Handlers til næste/forrige billede
  const handleNext = (e) => {
    e.stopPropagation(); // forhindre luk ved klik inde i modal
    setSelectedIndex((prev) => (prev + 1) % video.length); // loop tilbage til start
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + video.length) % images.length);
  };
  return (
    <div className="max-w-[80%] mx-auto">
      <div className="flex flex-col items-center pb-4">
        <h1>Latest Video</h1>
        <Image
          src="/assets/bottom_line2.png"
          alt="line"
          width={500}
          height={200}
          className="object-contain"
        />
      </div>
      <div>
        <div className="relative ">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-50 border-t-accent border-r-50 border-r-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-accent border-l-50 border-l-transparent"></div>
          <video
            className="videoo w-full"
            src="assets/media/video-dj-crowd-2.mp4"
            width="400"
            height="250"
            controls
          ></video>
        </div>
        <div className="relative ">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-50 border-t-accent border-r-50 border-r-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-accent border-l-50 border-l-transparent"></div>
          <video
            className="videoo w-full"
            src="assets/media/video-dj-crowd1.mp4"
            width="400"
            height="250"
            controls
          ></video>
        </div>
      </div>
      {/* Dekstop Pile */}
      <BiCaretLeftSquare
        size={50}
        color="white"
        className="absolute -left-[60px] top-1/2 -translate-y-1/2 cursor-pointer hidden md:block"
        onClick={handlePrev}
      />
      <BiCaretRightSquare
        size={50}
        color="white"
        className="absolute -right-[60px] top-1/2 -translate-y-1/2 cursor-pointer hidden md:block"
        onClick={handleNext}
      />
    </div>
  );
};

export default Video;
