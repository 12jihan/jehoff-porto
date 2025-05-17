import "./ParticleStars.scss";
import { ReactElement, RefObject, useEffect, useRef } from "react";
import * as THREE from "three";

function ParticleStars(): ReactElement {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect((): (() => void) | undefined => {
    const clock = new THREE.Clock();
    const mountNode: HTMLDivElement | null = mountRef.current;
    if (!mountNode) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      95,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      60,
    );
    const renderer = new THREE.WebGLRenderer();

    camera.position.set(0, 0, 2);

    const torusGeometry = new THREE.SphereGeometry();
    const torusMats: THREE.PointsMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
    });
    const torus = new THREE.Points(torusGeometry, torusMats);

    const particlesCount: number = 5000;
    const posArray: Float32Array = new Float32Array(particlesCount * 3);
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMats: THREE.PointsMaterial = new THREE.PointsMaterial({
      size: 0.005,
    });
    for (let i = 0; i < particlesCount * 3; i++) {
      // positions the particles:
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particleMesh = new THREE.Points(particlesGeometry, particlesMats);

    // Add to scene:
    // scene.add(torus);
    scene.add(particleMesh);

    // Render:
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setClearColor(new THREE.Color("#21282a"), 1);
    mountNode.appendChild(renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      const _dt = clock.getDelta();

      // torus.rotation.y += 0.5 * _dt;
      particleMesh.rotation.y += -0.1 * _dt;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
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

  return <div className="three-scene" ref={mountRef}></div>;
}

export default ParticleStars;
