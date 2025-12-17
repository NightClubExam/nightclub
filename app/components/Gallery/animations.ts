// FRIDA
// Er i ts-fil for at gøre koden mere genbrugelig

// Parent animation – styrer hvordan children animeres
export const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};
// Child animation – styrer hvordan hvert billede kommer ind
export const item = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
