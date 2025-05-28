import { MessageCircle } from "lucide-react";
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
      className="banner-container"
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
    >
      {title && <h1 className="banner-header">{title}</h1>}
      <p className="banner-subtext">{subtext && subtext}</p>
      <div className="btn-grp">
        <button type="button" className="banner-btn">
          Let's Talk! <MessageCircle />
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
