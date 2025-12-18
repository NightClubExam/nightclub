import Navigation from "./components/layouts/Navigation";
import Hero from "./components/ui/Hero";
import Welcome from "./components/layouts/Welcome";
import Events from "./components/ui/Events";
import Gallery from "./components/gallery/Gallery";
import MediaPlayer from "./components/ui/MediaPlayer";
import Video from "./components/ui/Video";
import Testimonials from "./components/ui/Testimonials";
import RecentBlog from "./components/blogs/RecentBlog";
import Subscription from "./components/forms/Subscription";
import Footer from "./components/layouts/Footer";
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
