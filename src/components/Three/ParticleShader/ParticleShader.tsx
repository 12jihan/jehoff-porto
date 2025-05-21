import "./ParticleShader.scss";
import { ReactElement, RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

function ParticleShader(): ReactElement {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect((): (() => void) | undefined => {
    const mountNode: HTMLDivElement | null = mountRef.current;
    if (!mountNode) return;
    while (mountNode.firstChild) {
      mountNode.removeChild(mountNode.firstChild);
    }

    // Get container dimensions
    const width = mountNode.clientWidth;
    const height = mountNode.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      95,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      60,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color("#21282a"), 1);
    mountNode.appendChild(renderer.domElement);

    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    const aspectRatio = width / height;
    const viewWidth = 20; // Horizontal view width in 3D units
    const viewHeight = viewWidth / aspectRatio;

    const clock = new THREE.Clock();
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Update time uniform for shader
    };
    animate();

    // Handle container resize
    const handleResize = () => {
      const newWidth = mountNode.clientWidth;
      const newHeight = mountNode.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }

      // Stop animation
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div className="three-scene" ref={mountRef}></div>
    </>
  );
}

export default ParticleShader;
