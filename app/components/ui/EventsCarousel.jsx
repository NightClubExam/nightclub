// NANNA
//https://www.shadcn.io/patterns/carousel-standard-2
//Embla Library/api: https://www.embla-carousel.com/docs/api/
"use client";

import { useState, useEffect } from "react"; //udeEffect for at detektere skærmstørrelse
import Image from "next/image";
import { Button } from "../../components/componentsShadcn/ui/button"; // Importerer shadcn's Button-komponent
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/componentsShadcn/ui/carousel"; // Importerer shadcn's Carousel-komponenter

// Props: modtager liste af events fra server-komponenten
export default function EventsCarousel({ events }) {
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
    ? Math.ceil(events.length / 2) // Stor skærm: halveret fordi 2 billeder vises ad gangen.. den måtte beregnes manuelt fordi shadcn carousel ikke har en indbygget måde at få det tal på (altså hvor mange knapper der skal være når der vises 2 billeder ad gangen)
    : events.length; // Lille skærm: en knap per event

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
          {/* Mapper alle events ud som slides */}
          {events.map((event, index) => (
            <CarouselItem key={event.id} className="basis-full md:basis-1/2">
              {" "}
              {/*bestemmer hvor mange billeder som bliver vist på en gang*/}
              {/*Lav et slide for hvert event, og giv det et id agtig, så React kan holde styr på dem */}
              <div className="relative overflow-hidden group ">
                <Image
                  src={`/assets/content-img/event-thumb${index + 1}.jpg`}
                  alt={event.title ?? `event${index + 1}`}
                  width={800}
                  height={400}
                  className="object-cover w-full h-[300px]"
                />

                {/* Overlay der vises ved hover */}
                <div
                  className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 
                  flex flex-col items-center justify-between transition-opacity duration-300 border-y-2 border-accent border-x-0 "
                >
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-50 border-t-accent border-r-50 border-r-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-50 border-b-accent border-l-50 border-l-transparent"></div>
                  <div className="flex items-center justify-center h-full">
                    <button className="bg-accent text-secondary py-2! px-4! cursor-pointer ">
                      BOOK NOW
                    </button>
                  </div>

                  <div className="bg-primary p-4! px-5!">
                    <p className="text-secondary! font-bold! text-[24px]!">
                      {event.title}
                    </p>
                    <p className="text-secondary! text-[14px] line-clamp-3 ">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
              {/* Dato og location bar */}
              <div className="bg-accent px-4 py-2 flex gap-4">
                <p className="text-secondary!">{event.date}</p>
                <p className="text-secondary!">{event.location}</p>
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
