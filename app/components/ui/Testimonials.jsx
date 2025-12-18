//FRIDA
import TestimonailsCarousel from "./TestimonailsCarousel"; // Importerer  client-komponent med karusellen
import Image from "next/image";

// Henter events fra API og viser dem
export default async function Testimonails() {
  const url = "http://localhost:4000/testimonials";
  // Henter data fra API.
  const response = await fetch(url);
  // Konverterer svaret til JSON (en array af testimonials)
  const testimonials = await response.json();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center gap-6 overflow-hidden">
      {/* Baggrund */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <Image
          src="/assets/bg/footerbg.jpg"
          alt="background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="max-w-[80%] mx-auto flex flex-col items-center z-10">
        {/* Kalder client-komponent og sender testimonials-array som prop */}
        <TestimonailsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
