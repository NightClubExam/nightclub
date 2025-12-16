//NANNA
"use client";
import { PiBowlFood } from "react-icons/pi";
import { PiCheersFill } from "react-icons/pi";
import Image from "next/image";
import WelcomeCard from "./WelcomeCard";

const Welcome = () => {
  return (
    <section className="flex flex-col items-center justify-center md:max-w-[80%] mx-auto gap-4">
      <div className="flex flex-col items-center ">
        <h1>Welcome in nightclub</h1>
        <Image
          src="/assets/bottom_line2.png"
          alt="line"
          width={500}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 gap-8 w-full md:px-0 px-[10%]">
        <WelcomeCard
          title={"Night Club"}
          icon={
            <Image
              src="/assets/icon/favicon.png"
              alt="thumb1"
              width={3}
              height={2}
              className="w-full h-auto object-cover m-5 "
            />
          }
          pic={
            <Image
              src="/assets/content-img/thumb1.jpg"
              alt="thumb1"
              width={350}
              height={200}
              className="w-full! md:h-[500px]! md:w-[800px]! object-cover h-[400px]! "
            />
          }
        />
        <WelcomeCard
          title={"Resturant"}
          icon={
            <div className="border-2 border-[#FF2A70] rounded-[7px] flex items-center justify-center w-max">
              <PiBowlFood size={40} color="#FF2A70" className="m-5" />
            </div>
          }
          pic={
            <Image
              src="/assets/content-img/reastaurant_1.jpg"
              alt="thumb2"
              width={350}
              height={200}
              className="w-full! md:h-[500px]! md:w-[800px]! object-cover h-[400px]! "
            />
          }
        />
        <WelcomeCard
          title={"Bar"}
          icon={
            <div className="border-2 border-[#FF2A70] rounded-[7px] flex items-center justify-center w-max">
              <PiCheersFill size={40} color="#FF2A70" className="m-5 " />
            </div>
          }
          pic={
            <Image
              src="/assets/content-img/thumb2.jpg"
              alt="thumb3"
              width={350}
              height={200}
              className="w-full! md:h-[500px]! md:w-[800px]! object-cover h-[400px]! "
            />
          }
        />
      </div>
    </section>
  );
};

export default Welcome;
