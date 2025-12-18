//NANNA
"use client";
import { useState } from "react";
import Image from "next/image";
import { BiCaretRightSquare, BiCaretLeftSquare } from "react-icons/bi";

const Video = () => {
  // Liste af videoer
  const videos = [
    "/assets/media/video-dj-crowd-2.mp4",
    "/assets/media/video-dj-crowd1.mp4",
  ];

  // Hvilken video der vises nu
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="md:max-w-[80%] md:mx-auto relative sm:w-full">
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

      {/* Kun én video ad gangen */}
      <div className="relative cursor-pointer">
        <div className="absolute top-0 left-0 w-0 h-0 border-t-50 border-t-accent border-r-50 border-r-transparent"></div>{" "}
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-accent border-l-50 border-l-transparent"></div>
        <video
          key={videos[selectedIndex]} // så den reloader når du skifter
          className="videoo w-full"
          src={videos[selectedIndex]}
          width="400"
          height="250"
          controls
        />
      </div>

      <div className="flex justify-center">
        {/* Pile til navigation */}
        <BiCaretLeftSquare
          size={50}
          color="white"
          className="cursor-pointer hidden md:block"
          onClick={handlePrev}
        />
        <BiCaretRightSquare
          size={50}
          color="white"
          className="   cursor-pointer hidden md:block"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Video;
