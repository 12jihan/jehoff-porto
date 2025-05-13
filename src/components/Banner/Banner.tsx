import "./Banner.scss";
import { ReactElement, useEffect, useRef } from "react";
import * as THREE from "three";

function Banner(): ReactElement {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    return (): void => {};
  }, []);

  return (
    <div className="banner-container">
      {/* <h1 className="banner-header">Jareem E. Hoff</h1> */}
      {/* <p className="banner-subtext"> */}
      {/*   Hi, I'm a professional <span>Fullstack Software Engineer</span> with */}
      {/*   over 8 years of experience crafting digital experiences that make a */}
      {/*   difference. I'm passionate about turning complex problems into elegant, */}
      {/*   user-friendly solutions */}
      {/* </p> */}
      {/* <div className="banner-scene" ref={mountRef}></div> */}
    </div>
  );
}

export default Banner;
