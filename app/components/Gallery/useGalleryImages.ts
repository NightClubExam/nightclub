// FRIDA
// Er i ts-fil for at gøre koden mere genbrugelig
"use client"
import { useEffect, useState } from "react";

export default function useGalleryImages() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        // Henter billeder fra api
        const res = await fetch("http://localhost:4000/gallery");
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    }
    fetchGallery();
  }, []);

  return images;
}
