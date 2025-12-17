//FRIDA
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const backgrounds = [
  "/assets/bg/header_bg_1.jpg",
  "/assets/bg/header_bg_2.jpg",
];

export default function Hero() {
  const [bg, setBg] = useState(backgrounds[0])

  useEffect(() => {
    setBg(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, [])
    
  

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Baggrund */}
      <Image
        src={bg}
        alt="Hero background"
        fill
        priority
        className="object-cover h-full"
      />

      {/* Overlay: logo + tagline + bottom line */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {/* Logo */}
        <motion.div //motion.div fordi vi bruger framer-motion til animation
          initial={{ opacity: 0, rotateX: 90, transformOrigin: 'top center',}}
          animate={{ opacity: 1, rotateX: 0,}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{transformPerspective: 1200,}}
        >
          <Image
            src="/assets/icon/logo.svg"
            alt="Night Club Logo"
            width={700}
            height={120}
          />
        </motion.div>

        {/* Tagline + Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center mt-4"
        >
          <h1 className="text-3xl tracking-[.98rem] font-light">
            Have a good time
          </h1>
          <Image
            src="/assets/bottom_line.png"
            alt="Bottom Line"
            width={600} // juster størrelse
            height={20}
            className="mt-2"
          />
        </motion.div>
      </div>
    </section>
  );
}
