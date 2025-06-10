import "./ContactForm.scss";
import { useForm } from "react-hook-form";
import { ReactElement } from "react";
import { IContactFormInput } from "../../interfaces/ContactForm/IContactForm";
import { useSubmitContactForm } from "../../customHooks/ContactFormHook";
// import ContactFormData from "../../interfaces/ContactForm/ContactForm";

export default function ContactForm(): ReactElement {
  const { submitContact, isLoading } = useSubmitContactForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactFormInput>();

  async function submitForm(data: IContactFormInput): Promise<void> {
    const formData: IContactFormInput = data;
    await submitContact(formData);
  }

  return (
    <div className="form-wrapper">
      <h3 className="form-title sub-header">Contact Me</h3>
      <form className="form">
        <label className="form__input">
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
        <label className="form__input">
          <span>Email:</span>
          <input
            {...register("email")}
            type="text"
            placeholder="Your Email..."
          />
        </label>
        <label className="form__textarea">
          <span>Message:</span>
          <textarea
            {...register("message")}
            rows={7}
            maxLength={300}
            placeholder="Your Message..."
          />
        </label>
        <div className="form__btns">
          <button
            type="button"
            className={`btn--sm btn--lime-outline ${isLoading ? "disabled" : ""}`}
            onClick={handleSubmit(submitForm)}
            disabled={true ? true : false}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
