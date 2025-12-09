// FRIDA
//import framermotion - npm install framer-motion

"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { BiCaretRightSquare, BiCaretLeftSquare } from "react-icons/bi";

// Parent = sstyrer animationen for alle children
const container = {
  hidden: {}, // starttilstand
  show: {
    // når elementet kommer i viewport
    transition: {
      staggerChildren: 0.2, // forsinkelse mellem hver child-animation
    },
  },
};

// Child-animation – styrer hvordan de kommer ind
const item = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Swipe funktionalitet til modal/lightbox
// Hvor stor skal swipe være for at skifte billede
const swipeConfidenceThreshold = 50;
// Beregner swipe "power" baseret på offset og hastighed
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

// Fetch
const Gallery = () => {
  // State til alle billeder
  const [images, setImages] = useState([]);
  // State til det valgte billede i modal
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("http://localhost:4000/gallery");
        const data = await res.json();
        setImages(data); // Gemmer billeder i state
      } catch (err) {
        console.error("Error fetching gallery:", err); // Fejlhåndtering
      }
    }
    fetchGallery();
  }, []);

  // Lås scrolling i baggrunden når modal er åben
  useEffect(() => {
    if (selectedIndex !== null) {
      // hvis modal åben -> disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // hvis modal lukket -> enable scroll
      document.body.style.overflow = "auto";
    }
  }, [selectedIndex]);

  if (!images.length) return null; // hvis ingen billeder, vis ingenting

  // Handlers til næste/forrige billede
  const handleNext = (e) => {
    e.stopPropagation(); // forhindre luk ved klik inde i modal
    setSelectedIndex((prev) => (prev + 1) % images.length); // loop tilbage til start
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Det aktuelle valgte billede
  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;
  

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.3, once: true }}
    >
      {/* Overskrift */}
      <div className="max-w-[75%] mx-auto flex flex-col items-center mt-20 relative">
        <h1>Nigth Club Gallery</h1>
        <Image
          src="/assets/bottom_line.png"
          alt="line"
          width={500}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Første række billeder */}
      <motion.div
        variants={container}
        className="grid sm:grid-cols-1 lg:grid-cols-4 mt-10"
      >
        {/* Mapper over de første 4 billeder */}
        {images.slice(0, 4).map((img, index) => (
          <motion.div
            key={img.id}
            variants={item}
            className="relative cursor-pointer"
            onClick={() => setSelectedIndex(index)} // åbner modal med valgt billede
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
              className="absolute inset-0 bg-black flex items-center justify-center border-t-2 border-b-2 border-[#FF2A70]"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70] border-l-30 border-l-transparent"></div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Anden række billeder */}
      <motion.div
        variants={item}
        className="grid sm:grid-cols-1 lg:grid-cols-3 col-span-4"
      >
        {/* Mapper over billede 5-7 */}
        {images.slice(4, 7).map((img, index) => (
          <motion.div
            key={img.id}
            variants={item}
            className="relative cursor-pointer"
            onClick={() => setSelectedIndex(index + 4)} // juster index for at matche det rigtige billede
          >
            <Image
              src={img.asset.url}
              alt={img.description}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              unoptimized
            />
            {/* Overlay border*/}
            <motion.div
              className="absolute inset-0 bg-black flex items-center justify-center border-t-2 border-b-2 border-[#FF2A70]"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70] border-l-30 border-l-transparent"></div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal der åbner billedet op + lightbox */}
      {/*mode="wait" venter på exit animation færdig før enter*/}
      <AnimatePresence initial={false} mode="wait">
        {currentImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.85)] flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)} // luk modal når man klikker udenfor
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="relative w-full max-w-[800px] mx-auto"
              onClick={(e) => e.stopPropagation()} // forhindre luk ved klik inde i modal
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  className="relative w-full flex flex-col"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  // SWIPE (drag)
                  drag="x" // tillader swipe
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    // Når swipe er over threshold, skift billede
                    if (swipe < -swipeConfidenceThreshold) {
                      handleNext(e);
                    } else if (swipe > swipeConfidenceThreshold) {
                      handlePrev(e);
                    }
                  }}
                >
                  <div className="relative w-full">
                    <Image
                      src={currentImage.asset.url}
                      alt={currentImage.description}
                      width={400}
                      height={400}
                      className="object-contain w-full h-auto"
                      unoptimized
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end">
                      <div className="border-t-4 border-[#FF2A70] w-full"></div>
                      <div className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-[#FF2A70] border-l-50 border-l-transparent"></div>
                    </div>

                    {/* Mobil pile*/}
                    <BiCaretLeftSquare
                      size={45}
                      color="white"
                      className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden cursor-pointer opacity-80"
                      onClick={handlePrev}
                    />

                    <BiCaretRightSquare
                      size={45}
                      color="white"
                      className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden cursor-pointer opacity-80"
                      onClick={handleNext}
                    />
                  </div>

                  {/* tekstboks */}
                  <div className="w-full bg-black bg-opacity-50  p-4 text-left">
                    <h3 className="text-white text-2xl font-semibold">
                      Night Club Party
                    </h3>
                    <p className="text-white text-xl mt-2">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable. If you are going to
                      use a passage of Lorem Ipsum, you need to be sure there
                      isn't anything embarrassing hidden in the middle of text.
                      All the Lorem Ipsum generators on the Internet tend to
                      repeat predefined chunks as necessary, making this the
                      first true generator on the Internet.
                    </p>
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
                </motion.div>
              </AnimatePresence>
              <div className="justify-end flex">
                <PrimaryButton title="Read more" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery;
