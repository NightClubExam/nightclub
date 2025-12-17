// // FRIDA
// //install framermotion - npm install framer-motion

"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import useGalleryImages from "./useGalleryImages";
import GalleryGrid from "./GalleryGrid"
import GalleryModal from "./GalleryModal";

export default function Gallery() {
  // Henter billeder via custom hook
  const images = useGalleryImages();
  // Holder styr på hvilket billede der er valgt (til modal)
  const [selectedIndex, setSelectedIndex] = useState(null);
  // Hvis der ikke er billeder endnu, vis ingenting
  if (!images.length) return null;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.3, once: true }}
    >
      {/* Overskrift */}
      <div className="max-w-[75%] mx-auto flex flex-col items-center relative">
        <h1>Night Club Gallery</h1>
        <Image
          src="/assets/bottom_line.png"
          alt="line"
          width={500}
          height={200}
          className="object-contain"
        />
      </div>

      <GalleryGrid
        images={images}
        startIndex={0}
        count={4}
        onSelect={setSelectedIndex}
        columns="lg:grid-cols-4"
      />

      <GalleryGrid
        images={images}
        startIndex={4}
        count={3}
        onSelect={setSelectedIndex}
        columns="lg:grid-cols-3 col-span-4"
      />

      {/* Modal */}
      <GalleryModal
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </motion.section>
  );
}
