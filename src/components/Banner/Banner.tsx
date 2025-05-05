import "./Banner.scss";
import { ReactElement } from "react";

function Banner(): ReactElement {
  return (
    <>
      <div className="banner-container">
        <h1>Jareem E. Hoff</h1>
        <p className="banner-subtext">
          Hi, I'm a professional <span>Fullstack Software Engineer</span> with
          over 8 years of experience crafting digital experiences that make a
          difference. I'm passionate about turning complex problems into
          elegant, user-friendly solutions
        </p>
      </div>
    </>
  );
}

export default Banner;
