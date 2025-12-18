// FRIDA
//npm install howler
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  BsFillSkipForwardFill,
  BsSkipBackwardFill,
  BsPlayCircle,
  BsPauseCircle,
  BsShuffle,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { Howl } from "howler";
import { motion } from "framer-motion";
import { BiCaretRightSquare, BiCaretLeftSquare } from "react-icons/bi";

const artists = [
  {
    id: 1,
    name: "Shadows In Neon",
    image: "/assets/content-img/track_thumb.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
  {
    id: 2,
    name: "You Belong With Me 2",
    image: "/assets/content-img/track1.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
  {
    id: 3,
    name: "Light on the Edge of the World",
    image: "/assets/content-img/track2.jpg",
    audio: "/assets/media/fashion-red-tape.mp3",
  },
  {
    id: 4,
    name: "Coffee and Chaos",
    image: "/assets/content-img/track4.jpg",
    audio: "/assets/media/black-box-funky.mp3",
  },
  {
    id: 5,
    name: "When Time Sleeps",
    image: "/assets/content-img/track5.jpg",
    audio: "/assets/media/euphoria.mp3",
  },
];

export default function MediaPlayer() {
  //STATES
  const [activeTrack, setActiveTrack] = useState(artists[0]); // Valgte/aktive track
  const [isPlaying, setIsPlaying] = useState(false); // Spiller musikken eller er den pauset?
  const [progress, setProgress] = useState(0); // Spole i sang
  const [currentTime, setCurrentTime] = useState(0); // Tid i sekunder - sangen
  const [volume, setVolume] = useState(0.8); // Lydstyrke
  const [isMuted, setIsMuted] = useState(false); // Mute lyd
  const [isShuffling, setIsShuffling] = useState(false); // Shuffle

  // Howler-lydobjekt - useRef bruges så UI ikke skal opdateres hver gang vi ændre lyd
  // Bruges når vi styre lyden, pause, play osv.
  const soundRef = useRef(null);
  const progressInterval = useRef(null); // gør at vi kan skifte sang og id'et opdateres og det tidligere kan stoppes
  const currentLoadedIdRef = useRef(null); // Gemmer det aktuelle tracks ID som er loaded i Howler, og gør så der ikke loades samme track igen

  // Forkorter track-navne så de passer i hover, maks to ord.
  const truncateWords = (text, maxWords) => {
    const words = text.split(" "); // Splitter teksten op i ord
    if (words.length <= maxWords) return text; // Hvis det er kort nok, gør vi ingenting
    return words.slice(0, maxWords).join(" ") + "..."; // Tag kun de første ord og tilføj "..."
  };

  // --- Starter et interval, som opdaterer hvor langt vi er i tracket ---
  // Intervallet kører ca. hvert 200ms, det opdaterer både progressbar (procent) og currentTime (sekunder)
  const startProgress = () => {
    // Stopper evt. tidligere interval, så vi ikke får flere samtidigt
    clearInterval(progressInterval.current);
    // Starter nyt interval
    progressInterval.current = setInterval(() => {
      // Tjekker først om der findes et Howler-lydobjekt, og om det spiller
      if (soundRef.current && soundRef.current.playing()) {
        const seek = soundRef.current.seek() || 0; // Hvor langt vi er i nummeret (sekunder)
        const dur = soundRef.current.duration() || 0; // Hvor langt nummeret varer i alt (sekunder)
        // Opdaterer React state:
        setProgress((seek / dur) * 100); // progress = procent (bruges til progress-bar UI)
        setCurrentTime(seek); // currentTime = hvor langt vi er (bruges til mm:ss i UI)
      }
    }, 200); // Interval kører hver 200ms → UI følger lyden næsten i realtid
  };

  //Stopper interval hvis der trykkes stop eller pause
  const stopProgress = () => {
    clearInterval(progressInterval.current);
  };

  // Gør at vi kan se tiden på tracket
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  // Afspil valgt track
  const handleSelectTrack = (track) => {
    // Stop evt. nuværende lyd
    soundRef.current?.stop();
    stopProgress();

    // Opret nyt lyd-objekt med Howler (Howler håndtere selve lyden)
    const sound = new Howl({
      src: [track.audio],
      volume: volume,
      onend: () => handleNext(), // Når tracket slutter afspil næste
    });
    // Gemmer den lyd der er igang
    soundRef.current = sound;
    currentLoadedIdRef.current = track.id;
    // Starter musikken og opdatere UI - billede, navn, tid osv.
    sound.play();
    setActiveTrack(track);
    setIsPlaying(true);
    startProgress();
  };

  // Play/Pause knap
  const handlePlayPause = () => {
    if (!activeTrack) return;
    //loader track først hvis det ikke er loadet, gør at UI og lyd ikke kommer ud af sync
    if (currentLoadedIdRef.current !== activeTrack.id) {
      // load & play det aktive track
      handleSelectTrack(activeTrack);
      return;
    }

    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause(); // Pause
      setIsPlaying(false);
      stopProgress();
    } else {
      soundRef.current.play(); // Play
      setIsPlaying(true);
      startProgress();
    }
  };

  // Næste/forrige sang _ SKRIV MERE
  const handleNext = () => {
    // Hvis der ikke er et aktivt track, gør vi ingenting
    if (!activeTrack) return;
    // Hvis shuffel er til, vælger den et tilfældigt track
    if (isShuffling) {
      let nextTrack;
      do {
        // Vælg et tilfældigt index i artists-arrayet
        const idx = Math.floor(Math.random() * artists.length);
        nextTrack = artists[idx];
      } while (nextTrack.id === activeTrack.id); // Sørg for ikke at vælge samme track

      // Afspil det nye track
      handleSelectTrack(nextTrack);
    } else {
      // Ellers: næste track i rækken
      const idx = artists.findIndex((a) => a.id === activeTrack.id);
      const next = (idx + 1) % artists.length; // Ellers kommer næste track i rækken, det gør også at den starter forfra, når vi kommer til sidste track
      handleSelectTrack(artists[next]); // Afspiller næste track
    }
  };
  // Afspil forrige track
  const handlePrev = () => {
    if (!activeTrack) return;
    const idx = artists.findIndex((a) => a.id === activeTrack.id); // Finder index på det aktuelle track
    // Hvis vi er ved første track, går vi til sidste track
    // Ellers bare forrige track i rækken
    const prev = idx === 0 ? artists.length - 1 : idx - 1;
    handleSelectTrack(artists[prev]); // Afspiller forrige track
  };

  // Næste track (kun navigation / UI, ikke afspilning) bruges i mobil
  const handleNavNext = () => {
    const idx = artists.findIndex((a) => a.id === activeTrack.id);
    const next = (idx + 1) % artists.length;
    setActiveTrack(artists[next]); // Skift kun aktivt track i UI, spiller ikke lyden
  };
  // Forrige track (kun navigation / UI, ikke afspilning) bruges i mobil
  const handleNavPrev = () => {
    const idx = artists.findIndex((a) => a.id === activeTrack.id);
    const prev = idx === 0 ? artists.length - 1 : idx - 1;
    setActiveTrack(artists[prev]); // Skift kun aktivt track i UI, spiller ikke lyden
  };
  // Slår Shuffel til og fra
  const toggleShuffle = () => {
    // Skifter mellem true/false
    // true = næste track vælges tilfældigt
    // false = næste track vælges i rækkefølge
    setIsShuffling(!isShuffling);
  };

  // Gør at vi kan spole i tracket ved at klikke på progressbar
  const handleScrub = (e) => {
    if (!soundRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect(); // Finder progress-barens position og bredde på skærmen
    const clickX = e.clientX - rect.left; // Hvor på baren brugeren har klikket
    const newProgress = clickX / rect.width; // Finder der hvor brugeren har klikket på progress-baren
    soundRef.current.seek(newProgress * soundRef.current.duration()); // og flytter afspilingen til det sted der er trykket på
    setProgress(newProgress * 100); // Opdaterer React state så UI (progressbar-knappen) følger med
  };

  // Volume-bar, gør at vi kan skrue op og ned
  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Finder volume-barens position og bredde på skærmen
    const clickX = e.clientX - rect.left; // Hvor på baren brugeren har klikket
    let newVol = clickX / rect.width; // Regner klik-positionen om til et tal mellem 0 og 1
    newVol = Math.max(0, Math.min(1, newVol)); // Sikre at volumen ikke går over 1 eller under 0
    setVolume(newVol); // Opdaterer React state, volume bruges til UI (knappen på volume-bar)
    if (soundRef.current) soundRef.current.volume(newVol); // Opdatere den rigtige lyd via Howler
    setIsMuted(newVol === 0); // Opdaterer muted state: hvis volume er 0 → muted = true
  };

  // Muter
  const toggleMute = () => {
    if (!soundRef.current) return;
    if (isMuted) {
      // Hvis vi allerede er muted, sæt lyd tilbage til volumen state eller default 0.8
      soundRef.current.volume(volume || 0.8);
      setIsMuted(false); // UI opdateres
    } else {
      // Hvis vi ikke er muted, skru helt ned
      soundRef.current.volume(0);
      setIsMuted(true); // UI opdateres
    }
  };
  // Stop lyd når komponent unmountes
  useEffect(() => {
    return () => {
      // Stopper musikken når komponenten fjernes, så der ikke er lyd der spiller i baggrunden
      soundRef.current?.stop();
      stopProgress();
    };
  }, []);

  return (
    <section className="flex flex-col md:max-w-[80%] mx-auto">
      <div className="max-w-[75%] mx-auto flex flex-col items-center mt-20 relative">
        <h1>Night Club Track</h1>
        <Image
          src="/assets/bottom_line.png"
          alt="line"
          width={500}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="md:hidden flex flex-col items-center mt-8 ">
        {" "}
        <h3 className="text-lg font-semibold text-center mb-3">
          {activeTrack?.name}
        </h3>{" "}
        {/* Progress-bar for at spole i sangen */}
        <div
          className="w-80 bg-accent h-1 rounded-full relative cursor-pointer mb-2"
          onClick={handleScrub} // Klik = spoler til det sted
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"
            style={{ left: `calc(${progress}% - 6px)` }} // progress i procent
          />
        </div>
        {/* Viser nuværende tid / total tid */}
        <div className="text-sm text-white mb-3">
          {formatTime(currentTime)} /{" "}
          {soundRef.current ? formatTime(soundRef.current.duration()) : "00:00"}
        </div>
        {/* Kontrolknapper: prev, play/pause, next, shuffle */}
        <div className="flex items-center gap-6 mb-3">
          <button onClick={handlePrev} className="text-white">
            <BsSkipBackwardFill size={26} />
          </button>
          <button onClick={handlePlayPause} className="text-white">
            {isPlaying ? (
              <BsPauseCircle size={36} />
            ) : (
              <BsPlayCircle size={36} />
            )}
          </button>
          <button onClick={handleNext} className="text-white">
            <BsFillSkipForwardFill size={26} />
          </button>
          <button
            onClick={toggleShuffle}
            className={isShuffling ? "text-accent" : "text-white"}
          >
            <BsShuffle size={18} />
          </button>
        </div>
        {/* Volume-bar og mute-knap */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={toggleMute} className="text-white">
            {isMuted || volume === 0 ? (
              <BsFillVolumeMuteFill size={18} />
            ) : (
              <BsFillVolumeUpFill size={18} />
            )}
          </button>
          <div
            className="w-36 h-1 bg-accent rounded-full relative cursor-pointer"
            onClick={handleVolumeChange} // klik = ændrer volumen
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"
              style={{ left: `calc(${volume * 100}% - 6px)` }}
            />
          </div>
        </div>
        {/* Billede af aktivt track */}
        <div className="w-full flex flex-col items-center">
          <Image
            src={activeTrack.image}
            alt={activeTrack.name}
            width={350}
            height={350}
            className="w-full"
          />
        </div>
        {/* Navigation mellem tracks uden at afspille (kun UI) */}
        <div className="w-full flex items-center justify-center mt-4 px-6">
          {" "}
          <BiCaretLeftSquare
            size={42}
            className="cursor-pointer text-white"
            onClick={handleNavPrev}
          />{" "}
          <BiCaretRightSquare
            size={42}
            className="cursor-pointer text-white"
            onClick={handleNavNext}
          />{" "}
        </div>
      </div>
      <div className="hidden md:block mt-8">
        {activeTrack && (
          <div className="flex gap-6">
            {/* Billedet til venstre */}
            <Image
              src={activeTrack.image}
              alt={activeTrack.name}
              width={400}
              height={400}
            />
            {/* Kontrolområde til højre */}
            <div className="flex flex-col flex-1 justify-center">
              <h3 className="text-xl font-semibold mb-6">{activeTrack.name}</h3>
              <div
                className="w-full h-1 bg-accent rounded-full relative cursor-pointer"
                onClick={handleScrub}
              >
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
                  style={{ left: `calc(${progress}% - 0.5rem)` }}
                ></div>
              </div>
              {/* Tid og knapper */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-white text-sm">
                  {formatTime(currentTime)} /{" "}
                  {soundRef.current
                    ? formatTime(soundRef.current.duration())
                    : "00:00"}
                </div>

                {/* Afspilning og shuffle */}
                <div className="flex items-center gap-6">
                  <button onClick={handlePrev} className="text-white">
                    <BsSkipBackwardFill size={30} />
                  </button>
                  <button onClick={handlePlayPause} className="text-white">
                    {isPlaying ? (
                      <BsPauseCircle size={40} />
                    ) : (
                      <BsPlayCircle size={40} />
                    )}
                  </button>
                  <button onClick={handleNext} className="text-white">
                    <BsFillSkipForwardFill size={30} />
                  </button>
                  <button
                    onClick={toggleShuffle}
                    className={isShuffling ? "text-accent" : "text-white"}
                  >
                    <BsShuffle size={20} />
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-white">
                    {isMuted || volume === 0 ? (
                      <BsFillVolumeMuteFill size={20} />
                    ) : (
                      <BsFillVolumeUpFill size={20} />
                    )}
                  </button>

                  <div
                    className="w-24 h-1 bg-accent rounded-full relative cursor-pointer"
                    onClick={handleVolumeChange}
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"
                      style={{ left: `calc(${volume * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Liste med alle tracks */}
        <div className="relative flex items-center justify-center">
          <BiCaretLeftSquare
            size={50}
            color="white"
            className="absolute left-[-60px] cursor-pointer md:block"
            // KAN IKKE NOGET LIGE NU
          />
          <div className="grid grid-cols-5 ">
            {artists.map((artist) => (
              <div
                key={artist.id}
                onClick={() => handleSelectTrack(artist)}
                className="cursor-pointer relative group"
              >
                <Image
                  src={artist.image}
                  alt={artist.name}
                  width={400}
                  height={400}
                  className={`rounded-md transition-opacity duration-300 group-hover:opacity-30 ${
                    activeTrack?.id === artist.id ? "opacity-20" : ""
                  }`}
                />
                {/* Hover-effekt med play-knap */}
                {activeTrack?.id !== artist.id && (
                  <motion.div
                    className="absolute inset-0  flex items-center justify-center border-t-2 border-b-2 border-[#FF2A70]"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 left-0 w-0 h-0 border-t-30 border-t-[#FF2A70] border-r-30 border-r-transparent"></div>

                    <div className="flex-1 flex items-center justify-center">
                      <BsPlayCircle size={50} className="text-accent" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white text-center py-2 justify-center flex">
                      {truncateWords(artist.name, 2)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-0 h-0 border-b-30 border-b-[#FF2A70] border-l-30 border-l-transparent"></div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <BiCaretRightSquare
            size={50}
            color="white"
            className="absolute right-[-60px] cursor-pointer md:block"
            // KAN IKKE NOGET LIGE NU
          />
        </div>
      </div>
    </section>
  );
}
