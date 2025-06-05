import { Code2Icon, MessageCircle } from "lucide-react";
// import GridRunner from "../Three/GridRunner/GridRunner";
// import ParticleStars from "../Three/ParticleStars/ParticleStars";
// import ParticleWaves from "../Three/ParticleWaves/ParticleWaves";
// import ParticleShader from "../Three/ParticleShader/ParticleShader";
import MovingDotsBG from "../MovingDotsBG/MovingDotsBG";
import "./Banner.scss";
import { ReactElement } from "react";

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
  return (
    <div
      className="banner"
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
    >
      {title && <h1 className="banner__title">{title}</h1>}
      <p className="banner__subtext">{subtext && subtext}</p>
      <div className="btn__group">
        <button type="button" className="btn btn--lime-outline">
          Let's Talk! <MessageCircle />
        </button>
        <button type="button" className="btn btn--lime">
          Checkout My Projects <Code2Icon />
        </button>
      </div>
      {/* <ParticleStars /> */}
      {/* <GridRunner /> */}
      {/* <ParticleWaves /> */}
      {/* <ParticleShader /> */}
      <MovingDotsBG />
    </div>
  );
}

export default Banner;
