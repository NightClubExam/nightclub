import Navigation from "../../components/layouts/Navigation";
import PageHero from "../../components/layouts/PageHero";
import Footer from "../../components/layouts/Footer";
import ContactFormNew from "../../components/forms/ContactFormNew";

export default function ContactUs() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col gap-16">
        <PageHero title="contact us" />
        <ContactFormNew />
        <Footer />
      </div>
    </>
  );
}
