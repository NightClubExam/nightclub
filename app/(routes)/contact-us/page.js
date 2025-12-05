
import Navigation from "../../components/Navigation";
import PageHero from "../../components/PageHero";
import Footer from "../../components/Footer";
import ContactUsForm from "../../components/ContactUsForm";

export default function ContactUs() {
  return (
    <div>
      <Navigation />
      <PageHero title="contact us"/>
<ContactUsForm />
      <Footer />
    </div>
  );
}
