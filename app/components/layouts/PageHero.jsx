//Alberte Remmer
import Image from "next/image";

const PageHero = ({title}) => {
  return (
    <div>
      {/* BILLEDE */}
      {/* Tailwind-koder:
      - relative for at placere billedet korrekt gennem fill
      - flex: gør "parent" til en flex-container, så placeringen kan styres gennem items-center og justify-center */}
      <div className="relative w-full h-20 flex items-center justify-center sm:h-20 md:h-40 lg:h-65">
        <Image
          src="/assets/bg/footerbg.jpg"
          alt="Nightclub Footer"
          fill
          className="object-cover" // Billedet fylder hele sin container
        />
        {/* OVERLAY */}
        {/* Tailwind koder:
        - absolute: overlayet ligger ovenpå billedet (placeres absolut i forhold til "parent").
        - inset-0: overlayet fylder hele "parent" containeren (bredde og højde) */}
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        {/* INDHOLD */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1>{title}</h1>
          <Image
            src="/assets/bottom_line.png" // streg fra vores assets
            alt="Dekorativ streg"
            width={300}
            height={2}
            className="sm:-mt-2 md:-mt-1 lg:mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PageHero;
