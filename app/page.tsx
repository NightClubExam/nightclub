import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import Events from "./components/Events";
import Gallery from "./components/Gallery/Gallery";
import MediaPlayer from "./components/MediaPlayer";
import Video from "./components/Video";
import Testimonials from "./components/Testimonials";
import RecentBlog from "./components/RecentBlog";
import Subscription from "./components/Subscription";
import Footer from "./components/Footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex flex-col gap-16">
        <Navigation />
        <Welcome />
        <Suspense fallback={<div>Loader events...</div>}>
          <Events />
        </Suspense>
        <Gallery />
        <MediaPlayer />
        <Video />
        <Suspense fallback={<div>Loader testimonials</div>}>
          <Testimonials />
        </Suspense>
        <RecentBlog />
        <Subscription />
        <Footer />
      </div>
    </div>
  );
}
