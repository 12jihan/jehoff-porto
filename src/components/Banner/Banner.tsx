import ParticleStars from "../Three/ParticleStars/ParticleStars";
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
      {/* {title && <h1 className="banner-header">{title}</h1>} */}
      {/* <p className="banner-subtext">{subtext && subtext}</p> */}
      <ParticleStars />
      {/* <GridRunner /> */}
    </div>
  );
}

export default Banner;
