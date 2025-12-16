//NANNA
"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const WelcomeCard = ({ title, icon, pic }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 gap-8 w-full md:px-0 px-[10%]">
        <div className="relative w-full">
          {pic}

          {/* Overlay der ligger ovenpå billedet og bliver vist når man hover*/}
          <motion.div
            className="absolute inset-0 bg-black opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 border-2 border-y-[#FF2A70] border-x-0"
            whileHover="hover" // Når man holder musen over overlayet, aktiveres varianten "hover" på alle child motion-elementer
            animate="rest" // Når der ikke er hover, forbliver child motion-elementer i varianten "rest" (standardtilstand)
          >
            {/* Dekorative hjørne-trekanter */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-50 border-t-[#FF2A70] border-r-50 border-r-transparent"></div>
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-[#FF2A70] border-l-50 border-l-transparent"></div>

            {/* Indhold inde i overlay */}
            <div className="flex flex-col items-center gap-4">
              <div className="border-2 border-[#FF2A70] rounded-[7px] flex items-center justify-center w-max">
                {icon}
              </div>

              {/* Titel (h4) der fader ind og zoomer lidt op */}
              <motion.h4
                className="text-secondary!"
                variants={{
                  rest: { opacity: 0, scale: 0.8 }, // rest: skjult når den ikke bliver vist med hover
                  hover: { opacity: 1, scale: 1 }, // hover: synlig og på normal position når man hover
                }}
                transition={{ duration: 1 }} //hvor lang tid animationen varer
              >
                {title}
              </motion.h4>

              {/* Tekst (p) der glider ind fra højre */}
              <motion.p
                className="text-sm! px-10 text-center"
                variants={{
                  rest: { opacity: 0, x: 50 },
                  hover: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus voluptate totam perferendis commodi consectetur quidem
                similique aspernatur earum eligendi cumque. Totam perferendis
                commodi consectetur quidem similique.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
