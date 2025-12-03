import Navigation from "../../components/Navigation";
import PageHero from "../../components/PageHero";
import BookForm from "../../components/BookForm";
import Footer from "../../components/Footer";

export default function BookTable() {
  return (
    <div>
      <Navigation />
      <PageHero title="book table"/>
      <BookForm />
      <Footer />
    </div>
  );
}
