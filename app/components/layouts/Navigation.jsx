"use client";
//NANNA
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import Link from "next/link";

const Navigation = () => {
  const [open, setOpen] = useState(false); // State-variabel "open" styrer om mobilmenuen er åben eller lukket
  const pathname = usePathname(); // Henter den nuværende sti
  const isActive = (path) => pathname === path; // Funktion til at tjekke om et link er aktivt
  return (
    <div className="sticky top-0 z-40">
      <nav className="flex items-center justify-around h-25 bg-black relative z-10 px-6 border-2 border-y-accent ">
        {/*Border med trekaneter i hjørnerne i de næste 2 divs  */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70] border-l-30 border-l-transparent"></div>

        <div>
          <a href="/">
            <Image
              src="/assets/icon/Logo_main.svg"
              alt="Nightclub Logo"
              width={160}
              height={200}
              className="object-contain "
            />
          </a>
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
            <Link
              href="/"
              className={`nav-underline ${isActive("/") ? "active text-accent" : ""}`}
            >
              {" "}
              HOME{" "}
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className={`nav-underline ${isActive("/blog") ? "active text-accent" : ""}`}
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/book-table"
              className={`nav-underline ${isActive("/book-table") ? "active text-accent" : ""} `}
            >
              BOOK TABLE
            </Link>
          </li>
          <li>
            <Link
              href="/contact-us"
              className={`nav-underline ${isActive("/contact-us") ? "active text-accent" : ""}`}
            >
              CONTACT US
            </Link>
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
            <a className="block" href="/">
              HOME
            </a>
            <a className="block" href="/blog">
              BLOG
            </a>
            <a className="block" href="/book-table">
              BOOK TABLE
            </a>
            <a className="block" href="/contact-us">
              CONTACT US
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;
