import "./Contact.scss";
import { ReactElement } from "react";
import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router";

export default function Contact(): ReactElement {
  const nav: NavigateFunction = useNavigate();
  const goToContact: () => void = (): void => {
    nav("/contact");
  };

  return (
    <section className="container">
      <h2 className="section-header-center">Let's Connect!</h2>
      <div className="section-body-center">
        <p className="subtext-center white">
          I'm always excited to discuss new projects and opportunities. Whether
          you need help with a specific challenge or want to explore potential
          collaboration, I'd love to hear from you.
        </p>
        <div className="btn-grp">
          <button className="btn btn--lime-outline" onClick={goToContact}>
            Contact Me Now
          </button>
        </div>
      </div>
    </section>
  );
}
