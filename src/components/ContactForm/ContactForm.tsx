import "./ContactForm.scss";
import { ReactElement, useState } from "react";
import ContactFormData from "../../interfaces/ContactForm/ContactForm";

export default function ContactForm(): ReactElement {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });

  return (
    <div className="form-wrapper">
      <h3>Contact Me</h3>
      <form>
        <label>
          <span>Name:</span>
          <input placeholder="Your Name..." type="text" />
        </label>
        <label>
          <span>Email:</span>
          <input placeholder="Your Email..." type="text" />
        </label>
        <label>
          <span>Message:</span>
          <textarea placeholder="Your Message..." rows={7} maxLength={300} />
        </label>
      </form>
      <div className="btn-group">
        <button type="button">Send Message</button>
      </div>
    </div>
  );
}
