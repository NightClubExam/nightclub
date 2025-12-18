import Navigation from "../../components/layouts/Navigation";
import PageHero from "../../components/layouts/PageHero";
import BlogPostSection from "../../components/blogs/BlogPostSection";
import Footer from "../../components/layouts/Footer";

export default function Blog() {
  return (
    <div>
      <Navigation />
      <PageHero title="blog" />
      <BlogPostSection />
      <Footer />
    </div>
  );
}
