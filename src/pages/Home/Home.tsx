import "./Home.scss";
import { ReactElement } from "react";

function Home(): ReactElement {
  return (
    <section className="home-container">
      <div className="header-container">
        <h2>Work Experience</h2>
      </div>
      <div className="intro-container">
        <div className="intro-row">
          <h3>Experience</h3>
          <div className="__card">
            <div className="__card-header">
              <p></p>
            </div>
            <div className="__card-body">
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <div className="connect-container">
        <div>
          <h3>Let's Connect</h3>
          <p>
            I'm always excited to discuss new projects and opportunities.
            Whether you need help with a specific challenge or want to explore
            potential collaboration, I'd love to hear from you.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
