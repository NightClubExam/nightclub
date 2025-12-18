// FRIDA
"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { BiCaretRightSquare, BiCaretLeftSquare } from "react-icons/bi";
import PrimaryButton from "../ui/PrimaryButton";
import { useEffect } from "react";

// Afgører om swipet er "kraftigt nok"
const swipeConfidenceThreshold = 50;
// Beregner swipe "styrke"
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

export default function GalleryModal({
  images,
  selectedIndex,
  setSelectedIndex,
}) {
  // Scroll lock styres her
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"; // lås scroll når modal er åben
    } else {
      document.body.style.overflow = "auto"; // gendan scroll når modal er lukket
    }
  }, [selectedIndex]);
  if (!images.length) return null;

  // Handlers til næste/forrige billede
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[selectedIndex];

  return (
    <AnimatePresence initial={false} mode="wait">
      {currentImage && (
        <motion.div
          className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.85)] flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)} // Luk modal ved klik udenfor
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="relative w-full max-w-[800px] mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage.id}
                className="relative w-full flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) handleNext(e);
                  else if (swipe > swipeConfidenceThreshold) handlePrev(e);
                }}
              >
                {/* Billedet i modal */}
                <div className="relative w-full">
                  <Image
                    src={currentImage.asset.url}
                    alt={currentImage.description}
                    width={400}
                    height={400}
                    className="object-contain w-full h-auto"
                    unoptimized
                  />

                  {/* Mobil pile */}
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

                {/* Tekstboks */}
                <div className="w-full bg-black bg-opacity-50 p-4 text-left">
                  <h3 className="text-white text-2xl font-semibold">
                    Night Club Party
                  </h3>
                  <p className="text-white text-sm! mt-2">
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators on the Internet tend to repeat
                    predefined chunks as necessary, making this the first true
                    generator on the Internet.
                  </p>
                  <div className="justify-end flex">
                    <PrimaryButton>Read more</PrimaryButton>
                  </div>
                </div>

                {/* Desktop pile */}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
