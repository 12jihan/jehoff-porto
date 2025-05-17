import "./Banner.scss";
import { ReactElement, useEffect, useRef } from "react";
import * as THREE from "three";

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
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect((): (() => void) | undefined => {
    // Check if a canvas already exists
    if (!mountRef.current) return;
    if (mountRef.current.querySelector("canvas")) {
      console.log("Canvas already exists, skipping initialization");
      return;
    }
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      60,
    );
    const renderer = new THREE.WebGLRenderer();

    // Set the render size
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );

    // Add renderer to the the DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    const division = 50;
    const limit = 100;
    const grid = new THREE.GridHelper(
      limit * 2,
      division,
      "#ff00ff",
      "#ff00ff",
    );

    // Position camera
    camera.position.set(0, 10, 50);

    scene.add(grid);
    scene.add(cube);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      grid.position.z += 0.1;
      if (grid.position.z >= 96) {
        grid.position.z = 0;
      }
      console.log(grid.position);
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect =
        mountRef.current!.clientWidth / mountRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current!.clientWidth,
        mountRef.current!.clientHeight,
      );
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return (): void => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }

      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="banner-container"
      style={{ backgroundColor: backgroundColor ? backgroundColor : "" }}
    >
      {title && <h1 className="banner-header">{title}</h1>}
      <p className="banner-subtext">{subtext && subtext}</p>
      <div className="three-bg" ref={mountRef}></div>
    </div>
  );
}

export default Banner;
