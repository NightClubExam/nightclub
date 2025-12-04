import Navigation from "./components/Navigation";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Hero = dynamic(() => import("./components/Hero"), {
  suspense: true,
} as any);
import Welcome from "./components/Welcome";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import MediaPlayer from "./components/MediaPlayer";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
import RecentBlog from "./components/RecentBlog";
import Subscription from "./components/Subscription";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <img
              src="/assets/loader/madbars.gif"
              alt="loading"
              className="w-32 h-32 object-contain"
            />
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Navigation />
      <Welcome />
      <Events />
      <Gallery />
      <MediaPlayer />
      <Video />
      <Testimonials />
      <RecentBlog />
      <Subscription />
      <Footer />
    </div>
  );
}
