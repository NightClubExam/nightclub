
import Navigation from "../../components/Navigation";
import PageHero from "../../components/PageHero";
import Footer from "../../components/Footer";
import ContactFormNew from "../../components/ContactFormNew";

export default function ContactUs() {
  return (
    <div>
      <Navigation />
      <PageHero title="contact us"/>
      <ContactFormNew />
      <Footer />
    </div>
  );
}
