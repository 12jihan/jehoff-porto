import "./GridRunner.scss";
import { ReactElement, RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

function GridRunner(): ReactElement {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect((): (() => void) | undefined => {
    const mountNode: HTMLDivElement | null = mountRef.current;
    if (!mountNode) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      60,
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    mountNode.appendChild(renderer.domElement);

    const division = 50;
    const limit = 100;
    const grid = new THREE.GridHelper(
      limit * 2,
      division,
      "#ff00ff",
      "#ff00ff",
    );
    scene.add(grid);
    camera.position.set(0, 10, 50);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      grid.position.z += 0.1;
      if (grid.position.z >= 96) {
        grid.position.z = 0;
      }
      renderer.render(scene, camera);
    };
    animate();

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

    return (): void => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }

      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <div className="grid-runner" ref={mountRef}></div>;
}

export default GridRunner;
