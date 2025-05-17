import "./Banner.scss";
import { ReactElement, useEffect, useRef } from "react";
import * as THREE from "three";
import GridRunner from "../Three/GridRunner/GridRunner";

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
      <GridRunner />
    </div>);
}

export default Banner;
