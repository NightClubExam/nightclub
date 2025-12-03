"use client";

import { useState } from "react";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Navigation = () => {
  const [open, setOpen] = useState(false); // State-variabel "open" styrer om mobilmenuen er åben eller lukket

  return (
    <div>
      <nav className="flex items-center justify-around h-25 bg-black relative z-10 px-6 border-4 border-[#FF2A70] ">
        {/*Border med trekaneter i hjørnerne i de næste 2 divs  */}
        <div class="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
        <div
          class="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70]
border-l-30 border-l-transparent"
        ></div>

        <div>
          <Image
            src="/assets/icon/Logo_main.svg"
            alt="Nightclub Logo"
            width={160}
            height={200}
            className="object-contain "
          />
        </div>
        {/*Burger knap, kun synlig på mobil, md:hidden skjuler det på desktop*/}
        <button
          onClick={() => setOpen(!open)} // Skifter state mellem true/false
          className="text-white text-3xl md:hidden"
        >
          <GiHamburgerMenu size={40} />
        </button>
        {/*Desktop-menu, skjult på mobil, vist fra md og op*/}
        <ul className="hidden md:flex gap-10 text-white">
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#">BLOG</a>
          </li>
          <li>
            <a href="#">BOOK TABLE</a>
          </li>
          <li>
            <a href="#">CONTACT US</a>
          </li>
          <li>
            <a href="#">LOG IN</a>
          </li>
        </ul>
      </nav>
      {/*Mobilmenu, popover overlay, – vises kun når open === true*/}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 bg-cover bg-center text-white md:hidden flex flex-col justify-center items-center h-screen">
          {/* Indhold ovenpå overlay */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-4xl z-10"
          >
            <IoCloseSharp size={40} />
          </button>

          <nav className="flex flex-col items-center gap-6 font-bold text-xl relative z-10">
            <a className="block" href="#">
              HOME
            </a>
            <a className="block" href="#">
              BLOG
            </a>
            <a className="block" href="#">
              BOOK TABLE
            </a>
            <a className="block" href="#">
              CONTACT US
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;
