import { ReactElement } from "react";

function ContactComponent(): ReactElement {
  return (
    <div className="contact-container">
      <div className="container">
        <h2>Let's Connect!</h2>
        <p>
          I'm always excited to discuss ne projects and opportunities. whether
          you need help with a specific challenge or want to explore potential
          collaboration, I'd love to hear from you.
        </p>
        <div className="btn-grp">
          <button>Contact Me Now</button>
        </div>
      </div>
    </div>
  );
}

export default ContactComponent;
