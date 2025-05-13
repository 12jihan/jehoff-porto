import "./Banner.scss";
import { ReactElement, useEffect, useRef } from "react";
import * as THREE from "three";

function Banner(): ReactElement {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    // Idea I have for the navbar disappearing and reappearing:
    // const test = () => {
    //   console.log("scroll", window.scrollY);
    // };
    // window.addEventListener("scroll", test);
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
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const object = new THREE.Mesh(geometry, material);
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    const _dl = new THREE.DirectionalLightHelper(light, 3);
    const amblight = new THREE.AmbientLight(0xffffff, 0.1);
    object.position.set(0, 0, 0);
    light.position.set(0, 2, 0);
    // const geometry = new THREE.SphereGeometry(50, 50, 50);
    // const material = new THREE.PointsMaterial({ color: 0xff00ff, size: 0.1 });
    // const object = new THREE.Points(geometry, material);
    // console.log(object.position);
    scene.add(_dl);
    scene.add(light);
    scene.add(amblight);
    scene.add(object);

    // camera.rotateX(-1);
    // camera.position.y = 5.8;
    camera.position.z = 10;

    // ✅ Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const amplitude = 3; // How far up and down
      const frequency = 0.4; // How fast
      const baseX = 0; // The center X position

      // In your animation loop:
      object.position.x =
        baseX +
        Math.sin(performance.now() * 0.001 * frequency * Math.PI * 2) *
          amplitude;

      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
      {/* <h1 className="banner-header">Jareem E. Hoff</h1> */}
      {/* <p className="banner-subtext"> */}
      {/*   Hi, I'm a professional <span>Fullstack Software Engineer</span> with */}
      {/*   over 8 years of experience crafting digital experiences that make a */}
      {/*   difference. I'm passionate about turning complex problems into elegant, */}
      {/*   user-friendly solutions */}
      {/* </p> */}
      <div className="banner-scene" ref={mountRef}></div>
    </div>
  );
}

export default Banner;
