import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
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
      <div className="flex flex-col gap-16">
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
    </div>
  );
}
