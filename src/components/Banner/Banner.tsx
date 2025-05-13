import "./Banner.scss";
import { ReactElement, useEffect, useRef } from "react";
import * as THREE from "three";

function Banner(): ReactElement {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initial sizes
    const getSizes = () => ({
      width: mountRef.current!.clientWidth,
      height: mountRef.current!.clientHeight,
    });

    let { width, height } = getSizes();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      // window.innerWidth / window.innerHeight,
    );
    const renderer = new THREE.WebGLRenderer();

    // ✅ Renderer size and add to dom:
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    mountRef.current.appendChild(renderer.domElement);

    // ✅ Add basic geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // ✅ Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing:
    const handleResize = () => {
      if (!mountRef.current) return;
      width = mountRef.current.clientWidth;
      height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return (): void => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="banner-container">
      <h1 className="banner-header">Jareem E. Hoff</h1>
      <p className="banner-subtext">
        Hi, I'm a professional <span>Fullstack Software Engineer</span> with
        over 8 years of experience crafting digital experiences that make a
        difference. I'm passionate about turning complex problems into elegant,
        user-friendly solutions
      </p>
      <div className="banner-scene" ref={mountRef}></div>
    </div>
  );
}

export default Banner;
