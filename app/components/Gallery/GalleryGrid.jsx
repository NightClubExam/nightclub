// FRIDA
"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import { container, item } from "./animations";

export default function GalleryGrid({
  images,
  startIndex,
  count,
  onSelect,
  columns = "lg:grid-cols-4",
}) {
  return (
    // Hele grid’et med animationer
    <motion.div
      variants={container}
      className={`grid sm:grid-cols-1 ${columns}`}
    >
      {/* Mapper over et billederne 1-4 */}
      {images.slice(startIndex, startIndex + count).map((img, index) => (
        <motion.div
          key={img.id}
          variants={item}
          className="relative cursor-pointer"
          onClick={() => onSelect(startIndex + index)} // Åbner modal med valgt billede
        >
          <Image
            src={img.asset.url}
            alt={img.description}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            unoptimized
          />
          {/* Overlay border */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center border-t-2 border-b-2 border-[#FF2A70]"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }} // her styrer vi kun baggrunden
            transition={{ duration: 0.3 }}
          >
            {/* Sort overlay med opacity */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Lyserøde borderhjørner – uden opacity */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70] border-l-30 border-l-transparent"></div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
