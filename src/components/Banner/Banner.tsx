import "./Banner.scss";
import { ReactElement, useRef } from "react";

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
  const mounted = useRef(null);

  return (
    <div
      className="banner-container"
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
    >
      {title && <h1 className="banner-header">{title}</h1>}
      <p className="banner-subtext">{subtext && subtext}</p>
      <div className="threejs-banner" ref={mounted}></div>
    </div>
  );
}

export default Banner;
