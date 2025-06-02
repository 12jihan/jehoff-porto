import "./ContactForm.scss";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";
import { IContactFormInput } from "../../interfaces/ContactForm/IContactForm";
import { useSubmitContactForm } from "../../customHooks/ContactFormHook";
// import ContactFormData from "../../interfaces/ContactForm/ContactForm";

export default function ContactForm(): ReactElement {
  const { submitContact } = useSubmitContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactFormInput>();

  function submitForm(data: IContactFormInput): void {
    const formData: IContactFormInput = data;
    submitContact(formData);
  }

  return (
    <div className="form-wrapper">
      <h3>Contact Me</h3>

      <form className="form">
        <label>
          <span>Name:</span>
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
          <input
            {...register("name", {
              required: {
                value: true,
                message: "* This is a required field",
              },
              maxLength: {
                value: 20,
                message: "* Max 20 characters",
              },
            })}
            type="text"
            placeholder="Your Name..."
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            {...register("email")}
            type="text"
            placeholder="Your Email..."
          />
        </label>
        <label>
          <span>Message:</span>
          {/* {...register()} */}
          <textarea
            {...register("message")}
            rows={7}
            maxLength={300}
            placeholder="Your Message..."
          />
        </label>
      </form>

      <div className="btn-group">
        <button type="button" onClick={handleSubmit(submitForm)}>
          Send Message
        </button>
      </div>
    </div>
  );
}
