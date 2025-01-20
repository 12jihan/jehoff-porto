import "./Home.scss";
import { ReactElement } from "react";

function Home(): ReactElement {
  return (
    <section className="home-container">
      <div className="header-container">
        <h2>Introduction</h2>
      </div>
      <div className="intro-container">
        <div className="intro-row">
          <div>
            <h3>Who I Am</h3>
            <p>
              Hi, I'm a professional web developer with over 8 years of
              experience crafting digital experiences that make a difference.
              I'm passionate about turning complex problems into elegant,
              user-friendly solutions
            </p>
          </div>
          <div>
            <h3>What I Do</h3>
            <p>I specialize in:</p>
            <ul>
              <li>Frontend Development (React, Angular)</li>
              <li>Backend Architecture (Node.js, Python)</li>
              <li>Performance Optimization</li>
              <li>User Experience Design</li>
              <li>Cloud Infrastructure</li>
            </ul>
          </div>
        </div>
        <div className="intro-row">
          <div>
            <h3>My Approach</h3>
            <p>
              I believe in writing clean, maintainable code that stands the test
              of time. Every project I undertake is an opportunity to create
              something meaningful that not only meets technical requirements
              but also delivers real value to users.
            </p>
          </div>
          <div>
            <h3>Beyond</h3>
            <p>
              I believe in writing clean, maintainable code that stands the test
              of time. Every project I undertake is an opportunity to create
              something meaningful that not only meets technical requirements
              but also delivers real value to users.
            </p>
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
