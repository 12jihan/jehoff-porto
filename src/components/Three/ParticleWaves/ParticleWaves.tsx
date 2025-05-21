import "./ParticleWaves.scss";
import * as THREE from "three";
import { ReactElement, RefObject, useEffect, useRef } from "react";

function ParticleWaves(): ReactElement {
  const mountRef: RefObject<HTMLDivElement | null> = useRef(null);

  useEffect((): (() => void) | undefined => {
    const mountNode: HTMLDivElement | null = mountRef.current;
    if (!mountNode) return;
    // Clear any existing canvas
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
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color("#21282a"), 1);
    mountNode.appendChild(renderer.domElement);

    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    const aspectRatio = width / height;
    const viewWidth = 20; // Horizontal view width in 3D units
    const viewHeight = viewWidth / aspectRatio;
    const particleCount = 10000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 2); // x, y velocities
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() * -viewWidth) / 2 - viewWidth / 4; // x (left side)
      positions[i * 3 + 1] = Math.random() - 0.1; // y (spread vertically)
      // positions[i * 3 + 1] = (Math.random() - 0.5) * viewHeight; // y (spread vertically)
      positions[i * 3 + 2] = 0; // z (depth)

      // Store original positions for swarming behavior
      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = 0;

      // Initial velocities
      velocities[i * 2] = 0.03 + Math.random() * 0.02; // x velocity
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01; // y velocity
    }
    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x4400ff,
      size: 0.015,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particleMesh = new THREE.Points(particles, particleMat);

    // Scenes to add:
    scene.add(particleMesh);

    // Mouse tracking
    const mouse: THREE.Vector2 = new THREE.Vector2(-1000, -1000);
    const mouseRadius = 0.1;
    const mouseStrength = 0.5;

    // Track mouse position
    const handleMouseMove = (event: any) => {
      const rect = mountNode.getBoundingClientRect();
      // Convert to normalized device coordinates within container
      const x = ((event.clientX - rect.left) / width) * 2 - 1;
      const y = -((event.clientY - rect.top) / height) * 2 + 1;

      // Convert to world coordinates
      const vector = new THREE.Vector3(x, y, 0);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      mouse.x = camera.position.x + dir.x * distance;
      mouse.y = camera.position.y + dir.y * distance;
    };

    mountNode.addEventListener("mouseleave", () => {
      // Move mouse far away when cursor leaves container
      mouse.x = -1000;
      mouse.y = -1000;
    });
    window.addEventListener("mousemove", handleMouseMove);

    // Swarm parameters
    // const swarmRadius = 0.5;
    // const swarmStrength = 0.02;
    const returnStrength = 0.01;
    const clock = new THREE.Clock();
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      const positions = particles.attributes.position.array;

      // Update each particle
      for (let i = 0; i < particleCount; i++) {
        // Move particles from left to right
        positions[i * 3] += velocities[i * 2];
        positions[i * 3 + 1] += velocities[i * 2 + 1];

        // Reset particles that go off-screen
        if (positions[i * 3] > viewWidth / 2) {
          positions[i * 3] = -viewWidth / 2;
          positions[i * 3 + 1] = (Math.random() - 0.5) * viewHeight;
          velocities[i * 2] = 0.03 + Math.random() * 0.02;
          velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01;
        }

        // Mouse interaction
        const particleX = positions[i * 3];
        const particleY = positions[i * 3 + 1];

        // Calculate distance to mouse
        const dx = mouse.x - particleX;
        const dy = mouse.y - particleY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        // Apply repulsion if within radius
        if (distToMouse < mouseRadius) {
          const force =
            ((mouseRadius - distToMouse) / mouseRadius) * mouseStrength;
          const angle = Math.atan2(dy, dx);

          // Push away from mouse with circular motion
          positions[i * 3] -= Math.cos(angle + Math.PI / 2) * force * 0.1;
          positions[i * 3 + 1] -= Math.sin(angle + Math.PI / 2) * force * 0.1;

          // Add some velocity changes for persistence
          velocities[i * 2] -= Math.cos(angle) * force * 0.05;
          velocities[i * 2 + 1] -= Math.sin(angle) * force * 0.05;
        }

        // Swarm behavior - particles affect each other (optimized)
        // if (i % 5 === 0) {
        //   // Only check every 5th particle as the influencer
        //   for (let j = 0; j < particleCount; j += 50) {
        //     // Check every 50th particle
        //     if (i !== j) {
        //       const otherX = positions[j * 3];
        //       const otherY = positions[j * 3 + 1];
        //
        //       const dxSwarm = otherX - particleX;
        //       const dySwarm = otherY - particleY;
        //       const distSwarm = Math.sqrt(
        //         dxSwarm * dxSwarm + dySwarm * dySwarm,
        //       );
        //
        //       if (distSwarm < swarmRadius && distSwarm > 0.01) {
        //         // Attraction to nearby particles
        //         positions[i * 3] += (dxSwarm / distSwarm) * swarmStrength;
        //         positions[i * 3 + 1] += (dySwarm / distSwarm) * swarmStrength;
        //       }
        //     }
        //   }
        // }
        // Add some wave-like motion
        positions[i * 3 + 1] +=
          Math.sin(time * 2 + positions[i * 3] * 0.5) * 0.01;

        // Gradually return to original path (y-coordinate only)
        const targetY =
          originalPositions[i * 3 + 1] + Math.sin(time + i * 0.1) * 0.5;
        positions[i * 3 + 1] +=
          (targetY - positions[i * 3 + 1]) * returnStrength;
      }
      // Mark positions for update
      particles.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Handle container resize
    const handleResize = () => {
      const newWidth = mountNode.clientWidth;
      const newHeight = mountNode.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Create ResizeObserver for the container
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountNode);

    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseMove);

      // Stop animation
      cancelAnimationFrame(animationId);

      // Dispose resources
      particles.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <div className="three-scene" ref={mountRef}></div>
    </>
  );
}

export default ParticleWaves;
