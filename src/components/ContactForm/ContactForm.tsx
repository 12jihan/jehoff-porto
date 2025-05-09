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
    <div>
      <form>
        <label>
          <input type="text" />
        </label>
        <label>
          <input type="text" />
        </label>
        <label>
          <input type="text" />
        </label>
      </form>
    </div>
  );
}
