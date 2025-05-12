import "./Banner.scss";
import { ReactElement, useRef } from "react";
import * as THREE from "three";

function Banner(): ReactElement {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    if (!mountRef) mountRef.current!.appendChild(renderer.domElement);
  }, []);

  return (
    <div className="banner-container">
      <h1>Jareem E. Hoff</h1>
      <p className="banner-subtext">
        Hi, I'm a professional <span>Fullstack Software Engineer</span> with
        over 8 years of experience crafting digital experiences that make a
        difference. I'm passionate about turning complex problems into elegant,
        user-friendly solutions
      </p>
    </div>
  );
}

export default Banner;
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
