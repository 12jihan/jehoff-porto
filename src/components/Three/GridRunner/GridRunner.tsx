import "./GridRunner.scss";
import { ReactElement, RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

function GridRunner(): ReactElement {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect((): (() => void) | undefined => {
    const mountNode: HTMLDivElement | null = mountRef.current;
    if (!mountNode) return;
    // if (mountRef.current.querySelector("canvas")) {
    //   console.log("Canvas already exists, skipping initialization");
    //   return;
    // }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      60,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current!.clientWidth,
      mountRef.current!.clientHeight,
    );
    mountNode.appendChild(renderer.domElement);

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
      if (mountRef) {
        mountRef.removeChild(renderer.domElement);
      }

      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div className="grid-runner" ref={mountRef}></div>;
}

export default GridRunner;
