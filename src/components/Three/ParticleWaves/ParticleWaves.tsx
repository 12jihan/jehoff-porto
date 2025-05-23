import * as THREE from "three"; // Corrected this line
import { ReactElement, RefObject, useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Assuming you have a SCSS file for basic container styling
// import "./ParticleWaves.scss";

function ParticleWaves(): ReactElement {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  // Function to create a glowing halo texture for particles
  const createParticleTexture = (): THREE.Texture => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const size = 128; // Texture size
    canvas.width = size;
    canvas.height = size;

    if (!context) {
      console.error("Failed to get 2D context for particle texture");
      // Fallback to a simple texture or handle error
      const fallbackTexture = new THREE.DataTexture(
        new Uint8Array([255, 255, 255, 255]),
        1,
        1,
        THREE.RGBAFormat,
      );
      fallbackTexture.needsUpdate = true;
      return fallbackTexture;
    }

    // Create a radial gradient (center white, fading to transparent)
    const gradient = context.createRadialGradient(
      size / 2, // x0
      size / 2, // y0
      0, // r0 (inner radius)
      size / 2, // x1
      size / 2, // y1
      size / 2, // r1 (outer radius)
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)"); // Center (fully opaque white)
    gradient.addColorStop(0.2, "rgba(200, 200, 255, 0.8)"); // Inner glow (slightly blueish, less opaque)
    gradient.addColorStop(0.5, "rgba(150, 100, 255, 0.3)"); // Mid glow (more color, more transparent)
    gradient.addColorStop(1, "rgba(100, 0, 255, 0)"); // Edge (fully transparent)

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true; // Ensure the texture is updated
    return texture;
  };

  useEffect((): (() => void) | undefined => {
    const mountNode: HTMLDivElement | null = mountRef.current;
    if (!mountNode) return;

    // Clear any existing canvas
    while (mountNode.firstChild) {
      mountNode.removeChild(mountNode.firstChild);
    }

    const getWidth = () => mountNode.clientWidth;
    const getHeight = () => mountNode.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, // Adjusted FOV slightly
      getWidth() / getHeight(),
      0.1,
      100,
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(getWidth(), getHeight());
    renderer.setClearColor(new THREE.Color("black"), 1); // Set background to black
    mountNode.appendChild(renderer.domElement);

    camera.position.set(0, 0, 3); // Adjusted camera position
    camera.lookAt(0, 0, 0);

    const aspectRatio = getWidth() / getHeight();
    const viewWidth = 20;
    const viewHeight = viewWidth / aspectRatio;

    // --- Grid Helper Setup ---
    const grid = new THREE.GridHelper(viewWidth, 30, "#222222", "#111111"); // Darkened grid for black background
    if (grid.material instanceof THREE.Material) {
      grid.material.depthTest = false;
      grid.material.depthWrite = false;
      grid.material.transparent = true;
      grid.material.opacity = 0.5; // Make grid very subtle on black
    }
    grid.rotateX(THREE.MathUtils.degToRad(90));
    grid.renderOrder = 0;
    scene.add(grid);

    // --- Particle System Setup ---
    const particleCount = 2000; // Slightly reduced count for performance with textures
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 2);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const i2 = i * 2;
      positions[i3] = (Math.random() - 0.5) * viewWidth;
      positions[i3 + 1] = (Math.random() - 0.5) * viewHeight * 0.7;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.2;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      velocities[i2] =
        (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
      velocities[i2 + 1] = (Math.random() - 0.5) * 0.004;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const particleTexture = createParticleTexture(); // Create the halo texture

    const particleMat = new THREE.PointsMaterial({
      map: particleTexture, // Apply the texture
      // color: 0xffffff, // Set to white if texture provides color, or tint with this
      size: 0.1, // Adjust size, texture affects perceived size
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthTest: false, // Keep these for layering
      depthWrite: false,
      // alphaTest: 0.01, // May need this if edges of texture are not perfectly transparent
      sizeAttenuation: true, // Points will be smaller further away
    });

    const particleMesh = new THREE.Points(particlesGeometry, particleMat);
    particleMesh.renderOrder = 1;
    scene.add(particleMesh);

    // --- Post-processing Setup (EffectComposer and UnrealBloomPass) ---
    const renderScene = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(getWidth(), getHeight()),
      1.8, // strength - might need to adjust with textured particles
      0.2, // radius
      0.06, // threshold - might need to adjust
    );
    // Fine-tune bloom:
    // bloomPass.strength = 0.8;
    // bloomPass.radius = 0.5;
    // bloomPass.threshold = 0.6;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2(-1000, -1000);
    const mouseRadius = 0.25; // Adjusted
    const mouseStrength = 0.15; // Adjusted

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountNode.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / getWidth()) * 2 - 1;
      const y = -((event.clientY - rect.top) / getHeight()) * 2 + 1;
      const vector = new THREE.Vector3(x, y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse.x = camera.position.x + dir.x * distance;
      mouse.y = camera.position.y + dir.y * distance;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    mountNode.addEventListener("mousemove", handleMouseMove);
    mountNode.addEventListener("mouseleave", handleMouseLeave);

    // --- Animation Loop ---
    const clock = new THREE.Clock();
    const returnStrength = 0.02;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentPositions = particlesGeometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const i2 = i * 2;

        currentPositions[i3] += velocities[i2];
        currentPositions[i3 + 1] += velocities[i2 + 1];

        const particleX = currentPositions[i3];
        const particleY = currentPositions[i3 + 1];
        const dxMouse = mouse.x - particleX;
        const dyMouse = mouse.y - particleY;
        const distToMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distToMouse < mouseRadius) {
          const force =
            ((mouseRadius - distToMouse) / mouseRadius) * mouseStrength;
          const angle = Math.atan2(dyMouse, dxMouse);
          currentPositions[i3] -= Math.cos(angle) * force;
          currentPositions[i3 + 1] -= Math.sin(angle) * force;
          velocities[i2] -= Math.cos(angle) * force * 0.03;
          velocities[i2 + 1] -= Math.sin(angle) * force * 0.03;
        }

        currentPositions[i3 + 1] +=
          Math.sin(elapsedTime * 1.1 + currentPositions[i3] * 0.2) * 0.006;

        const targetY =
          originalPositions[i3 + 1] +
          Math.sin(elapsedTime * 0.7 + i * 0.15) * 0.2;
        currentPositions[i3 + 1] +=
          (targetY - currentPositions[i3 + 1]) * returnStrength;

        // Boundary conditions
        const wrapOffset = 1.5; // How far off screen before wrapping
        if (currentPositions[i3] > viewWidth / 2 + wrapOffset) {
          currentPositions[i3] = -viewWidth / 2 - wrapOffset;
          currentPositions[i3 + 1] = (Math.random() - 0.5) * viewHeight * 0.7;
          velocities[i2] = Math.random() * 0.015 + 0.005;
        } else if (currentPositions[i3] < -viewWidth / 2 - wrapOffset) {
          currentPositions[i3] = viewWidth / 2 + wrapOffset;
          currentPositions[i3 + 1] = (Math.random() - 0.5) * viewHeight * 0.7;
          velocities[i2] = -(Math.random() * 0.015 + 0.005);
        }
        if (currentPositions[i3 + 1] > viewHeight / 2 + wrapOffset * 0.7) {
          currentPositions[i3 + 1] = -viewHeight / 2 - wrapOffset * 0.7;
        } else if (
          currentPositions[i3 + 1] <
          -viewHeight / 2 - wrapOffset * 0.7
        ) {
          currentPositions[i3 + 1] = viewHeight / 2 + wrapOffset * 0.7;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      composer.render();
    };
    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      const newWidth = getWidth();
      const newHeight = getHeight();

      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountNode);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      mountNode.removeEventListener("mousemove", handleMouseMove);
      mountNode.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.unobserve(mountNode);
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }

      // Dispose texture
      particleTexture.dispose();

      particlesGeometry.dispose();
      particleMat.dispose();
      if (grid.material instanceof THREE.Material) grid.material.dispose();
      if (grid.geometry) grid.geometry.dispose();

      renderer.dispose();
      scene.clear();
    };
  }, []);

  const styles: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#000000", // Set container background to black
  };

  return <div style={styles} ref={mountRef}></div>;
}

export default ParticleWaves;
