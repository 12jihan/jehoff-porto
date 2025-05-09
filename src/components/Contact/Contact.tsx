import "./Contact.scss";
import { ReactElement } from "react";
import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router";

export default function (): ReactElement {
  const nav: NavigateFunction = useNavigate();
  const goToContact = (): void => {
    nav("/contact");
  };

  return (
    <div className="contact-container">
      <h2>Let's Connect!</h2>
      <div className="text-group-v">
        <p>
          I'm always excited to discuss new projects and opportunities. Whether
          you need help with a specific challenge or want to explore potential
          collaboration, I'd love to hear from you.
        </p>
        <div className="btn-grp">
          <button onClick={goToContact}>Contact Me Now</button>
        </div>
      </div>
    </div>
  );
}
