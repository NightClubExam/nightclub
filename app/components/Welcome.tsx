"use client";
import { PiBowlFood } from "react-icons/pi";
import { PiCheersFill } from "react-icons/pi";
import Image from "next/image";

//NANNA

const Welcome = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <div className="max-w-[80%] mx-auto flex flex-col items-center">
        <h1>Welcome in nightclub</h1>
        <Image
          src="/assets/bottom_line2.png"
          alt="line"
          width={160}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="relative w-full">
          <Image
            src="/assets/content-img/thumb1.jpg"
            alt="thumb1"
            width={350}
            height={200}
            className="w-full h-auto object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 border-4 border-[#FF2A70]">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
            <div
              className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70]
border-l-30 border-l-transparent"
            ></div>

            <div className="flex flex-col items-center">
              <div className="border-2 border-[#FF2A70] p-4! rounded-lg flex items-center justify-center w-max">
                <Image
                  src="/assets/icon/favicon.png"
                  alt="thumb1"
                  width={2}
                  height={1}
                  className="w-full h-auto object-cover"
                />
              </div>

              <p className="text-white text-xl">Din tekst her</p>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <Image
            src="/assets/content-img/reastaurant_1.jpg"
            alt="reastaurant_1"
            width={350}
            height={200}
            className="object-contain"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 border-4 border-[#FF2A70]">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
            <div
              className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70]
border-l-30 border-l-transparent"
            ></div>
            <div className="flex flex-col items-center">
              <div className="border-2 border-[#FF2A70] p-4! rounded-lg flex items-center justify-center w-max">
                <PiBowlFood size={40} color="#FF2A70" />
              </div>
              <p className="text-white text-xl">Din tekst her</p>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <Image
            src="/assets/content-img/thumb2.jpg"
            alt="thumb2"
            width={350}
            height={200}
            className="object-contain"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 border-4 border-[#FF2A70]">
            <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
            <div
              className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70]
border-l-30 border-l-transparent"
            ></div>
            <div className="flex flex-col items-center">
              <div className="border-2 border-[#FF2A70] p-4! rounded-lg flex items-center justify-center w-max">
                <PiCheersFill size={40} color="#FF2A70" className="m-10" />
              </div>
              <p className="text-white text-xl">Din tekst her</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

