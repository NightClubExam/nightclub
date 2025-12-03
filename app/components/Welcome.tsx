"use client";

import Image from "next/image";

const Welcome = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <div className="max-w-[80%] mx-auto flex flex-col items-center">
        <h1>Welcome in nightclub</h1>
        <Image
          src="/assets/bottom_line2.png"
          alt="line"
          width={160}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Image
          src="/assets/content-img/thumb1.jpg"
          alt="thumb1"
          width={350}
          height={200}
          className="object-contain"
        />
        <Image
          src="/assets/content-img/reastaurant_1.jpg"
          alt="reastaurant_1"
          width={350}
          height={200}
          className="object-contain"
        />
        <Image
          src="/assets/content-img/thumb2.jpg"
          alt="thumb2"
          width={350}
          height={200}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Welcome;
