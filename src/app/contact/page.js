import PageHeader from "@/components/pageHeader";
import ContactForm from "../../components/contactForm";
const ContactPage = () => {
  return (
    <div>
      <PageHeader
        header="Contact Us"
        description="Give us feedback or report an issue"
        img="url('/images/4.avif')"
      />
      <ContactForm />
    </div>
  );
};

export default ContactPage;
