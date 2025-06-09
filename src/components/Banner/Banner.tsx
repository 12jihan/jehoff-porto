import { Code2Icon, MessageCircle } from "lucide-react";
// import GridRunner from "../Three/GridRunner/GridRunner";
// import ParticleStars from "../Three/ParticleStars/ParticleStars";
import ParticleWaves from "../Three/ParticleWaves/ParticleWaves";
// import ParticleShader from "../Three/ParticleShader/ParticleShader";
// import MovingDotsBG from "../MovingDotsBG/MovingDotsBG";
import "./Banner.scss";
import { ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router";

export interface BannerProps {
  title?: string;
  subtext?: string;
  backgroundColor?: string;
}

function Banner({
  title,
  subtext,
  backgroundColor,
}: BannerProps): ReactElement {
  const nav: NavigateFunction = useNavigate();

  return (
    <div
      className="banner"
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
    >
      <div className="banner__content">
        {title && <h1 className="banner__title">{title}</h1>}
        <p className="banner__subtext">{subtext && subtext}</p>
        <div className="btn__group">
          <button
            type="button"
            className="btn btn--lime-outline"
            onClick={(): void | Promise<void> => nav("/contact")}
          >
            Let's Talk! <MessageCircle />
          </button>
          <button
            type="button"
            className="btn btn--lime"
            onClick={(): void | Promise<void> => nav("/projects")}
          >
            Checkout My Projects <Code2Icon />
          </button>
        </div>
      </div>
      <ParticleWaves />
      {/* <ParticleStars /> */}
      {/* <GridRunner /> */}
      {/* <ParticleShader /> */}
      {/* <MovingDotsBG /> */}
    </div>
  );
}

export default Banner;
