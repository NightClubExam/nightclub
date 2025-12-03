import Navigation from "../../components/Navigation";
import BlogPost from "../../components/BlogPost";
import CommentForm from "../../components/CommentForm";
import Footer from "../../components/Footer";

export default function BlogPost() {
  return (
    <div>
      <Navigation />
      <BlogPost title="blog post" />
      <CommentForm />
      <Footer />
    </div>
  );
}
