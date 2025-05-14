import "./ContactPage.scss";
import ContactForm from "../../components/ContactForm/ContactForm";
import { ReactElement } from "react";

function ContactPage(): ReactElement {
  return (
    <div className="contact-page-container">
      <ContactForm />
    </div>
  );
}

export default ContactPage;
