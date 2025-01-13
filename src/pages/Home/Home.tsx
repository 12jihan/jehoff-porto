import { ReactElement } from "react";
import "./Home.scss";

function Home(): ReactElement {
  return (
    <div className="home-container">
      <section className="banner-container">
        <div>
          <h1>Jareem E. Hoff</h1>
          <p>Fullstack Engineer</p>
        </div>
      </section>
      <section className="section-container section-mt">
        <div className="section-header">
          <h1>About Me</h1>
        </div>
        <div className="section-body">
          <div className="intro-wrapper">
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

          <div className="intro-wrapper">
            <div>
              <h3>My Approach</h3>
              <p>
                I believe in writing clean, maintainable code that stands the
                test of time. Every project I undertake is an opportunity to
                create something meaningful that not only meets technical
                requirements but also delivers real value to users.
              </p>
            </div>
            <div>
              <h3>Beyond</h3>
              <p>
                I believe in writing clean, maintainable code that stands the
                test of time. Every project I undertake is an opportunity to
                create something meaningful that not only meets technical
                requirements but also delivers real value to users.
              </p>
            </div>
          </div>
          <h3>Let's Connect</h3>
          <p>
            I'm always excited to discuss new projects and opportunities.
            Whether you need help with a specific challenge or want to explore
            potential collaboration, I'd love to hear from you.
          </p>
        </div>
        <div className="section-footer"></div>
      </section>
    </div>
  );
}

export default Home;
