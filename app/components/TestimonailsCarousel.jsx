// NANNA & FRIDA
//https://www.shadcn.io/patterns/carousel-standard-2
//Embla Library/api: https://www.embla-carousel.com/docs/api/
"use client";

import { useState, useEffect } from "react"; //udeEffect for at detektere skærmstørrelse
import Image from "next/image";
import { Button } from "@/componentsShadcn/ui/button"; // Importerer shadcn's Button-komponent
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/componentsShadcn/ui/carousel"; // Importerer shadcn's Carousel-komponenter
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

// Props: modtager liste af testimonials fra server-komponenten
export default function TestimonialsCarousel({ testimonials }) {
  const [api, setApi] = useState(null); // // api- altså Embla-Libery: gemmer en reference til shadcn Carousel's API-objekt (så man kan styre den manuelt som vi får fra shadcn)
  const [current, setCurrent] = useState(0); // current: holder styr på hvilket slide der er aktivt
  const [isLargeScreen, setIsLargeScreen] = useState(false); // isLargeScreen: holder styr på om vi er på en stor skærm
  const [isHovering, setIsHovering] = useState(false); // isHovering: holder styr på om musen er over karusellen

  // useEffect til at detektere skærmstørrelse ift hvor mange knapper der skal vises
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // md breakpoint... hvis skærmen er større end eller lig med 768px → true
    };
    checkScreenSize(); // Kører funktionen med det samme
    window.addEventListener("resize", checkScreenSize); // Lyt efter ændringer i skærmstørrelse
    return () => window.removeEventListener("resize", checkScreenSize); // Cleanup: fjern event listener når komponenten unmountes
  }, []);

  // Beregn antal knapper baseret på skærmstørrelse
  const buttonCount = isLargeScreen
    ? Math.ceil(testimonials.length ) // Stor skærm: halveret fordi 2 billeder vises ad gangen.. den måtte beregnes manuelt fordi shadcn carousel ikke har en indbygget måde at få det tal på (altså hvor mange knapper der skal være når der vises 2 billeder ad gangen)
    : testimonials.length; // Lille skærm: en knap per event

  // Auto-slide useEffect: skifter slide hver 5 sekund medmindre musen er over karusellen
  useEffect(() => {
    if (!api || isHovering) return; // Pause hvis hovering

    const interval = setInterval(() => {
      api.scrollNext(); // Skift til næste slide ved brug af Embla til at scrolle til næste slide
    }, 5000); // 5 sekunder

    return () => clearInterval(interval); // Cleanup: fjern interval når komponenten unmountes eller når isHovering ændres
  }, [api, isHovering]);

  // Denne funktion kører, når karusellen er klar og giver os adgang til at man kan styre den
  const handleApiChange = (newApi) => {
    setApi(newApi); // Her gemmer vi karusellens styrings-objekt, når Carousel-komponenten starter, giver den os et "API" med funktioner som scrollTo.
    // Vi lægger det i state, så vi senere kan bruge det til at skifte imellem evenetsne.

    if (newApi) {
      setCurrent(newApi.selectedScrollSnap()); // Starter med at vise det slide vi står på nu (null ved start)

      newApi.on("select", () => {
        // Når man skifter slide i karusellen, opdaterer vi current, så vi hele tiden ved hvilket slide der er aktivt
        setCurrent(newApi.selectedScrollSnap());
      });
    }
  };
  // Indstillinger til Carousel-komponenten
  const carouselOpts = {
    //opts-prop til shadcn Carousel-komponenten som kan komme med forskellige indstillinger ift skærme-størrelser
    align: "start",
    loop: true,
  };

  return (
    <div
      className="mx-auto w-full space-y-4 "
      onMouseEnter={() => setIsHovering(true)} // Sæt hovering til true når musen er over karusellen
      onMouseLeave={() => setIsHovering(false)} // Sæt hovering til false når musen forlader karusellen
    >
      <Carousel setApi={handleApiChange} opts={carouselOpts}>
        {" "}
        {/*Igennem Shadcn bruger man et libery der hedder Embla, som indholder forskellige metoder til at styre karusellen*/}
        <CarouselContent className="gap-4">
          {/* Mapper alle testimonials ud som slides */}
          {testimonials.map((testimonial) => (
            <CarouselItem
              key={testimonial.id}
              className="basis-full "
            >
              {" "}
              {/*bestemmer hvor mange billeder som bliver vist på en gang*/}
              {/*Lav et slide for hvert event, og giv det et id agtig, så React kan holde styr på dem */}
              <div className="relative overflow-hidden group">
                <div className="max-w-[80%] mx-auto flex flex-col items-center">
                  <Image
                    src={testimonial.asset.url}
                    alt={testimonial.name || "testimonial image"}
                    width={200}
                    height={200}
                    className="z-10 object-contain mt-20 mb-5"
                    unoptimized
                  />

                  <h3>{testimonial.name}</h3>
                  <p className="text-center">{testimonial.content}</p>
                  <div className="flex gap-4 mt-4 mb-10">
                    <a
                      href={testimonial.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="border border-white hover:border-accent  flex items-center justify-center w-max p-1">
                        <FaFacebookF
                          size={25}
                          className="text-white hover:text-accent cursor-pointer"
                        />
                      </div>
                    </a>
                    <a
                      href={testimonial.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="border border-white hover:border-accent  flex items-center justify-center w-max p-1">
                        <FaInstagram
                          size={25}
                          className="text-white hover:text-accent cursor-pointer"
                        />
                      </div>
                    </a>
                    <a
                      href={testimonial.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="border border-white hover:border-accent flex items-center justify-center w-max p-1">
                        <FaTwitter
                          size={25}
                          className="text-white hover:text-accent cursor-pointer"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation-knapper under karusellen */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: buttonCount }).map((_, index) => (
          <Button
            key={index}
            // Brug karusellens API til at hoppe til det valgte slide
            onClick={() => api?.scrollTo(index)}
            // Fremhæv knappen hvis den svarer til det aktuelle slide
            className={
              current === index
                ? "bg-accent border-0"
                : "bg-secondary border-0 hover:bg-gray-300"
            }
          />
        ))}
      </div>
    </div>
  );
}
