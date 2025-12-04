// NANNA
//download denne for at brude SHdcn komponenter:  npx shadcn@latest init
//derefter: npx shadcn@latest add button
//og npx shadcn@latest add carousel
// Importerer Next.js' optimerede Image-komponent
import Image from "next/image";
import EventsCarousel from "./EventsCarousel"; // Importerer  client-komponent med karusellen

// Henter events fra API og viser dem
export default async function Events() {
  const url = "http://localhost:4000/events";

  // Henter data fra API.
  const response = await fetch(url);

  // Konverterer svaret til JSON (en array af events)
  const events = await response.json();

  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <div className="max-w-[80%] mx-auto flex flex-col items-center">
        <h1>Events of the month</h1>
        <Image
          src="/assets/bottom_line2.png"
          alt="line"
          width={160}
          height={200}
          className="object-contain"
        />

        {/* Kalder client-komponent og sender events-array som prop */}
        <EventsCarousel events={events} />
      </div>
    </section>
  );
}
