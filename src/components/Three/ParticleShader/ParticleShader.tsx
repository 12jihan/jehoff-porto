import "./ParticleShader.scss";
import { ReactElement, RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "postprocessing";
import { RenderPass } from "three/examples/jsm/Addons.js";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { Pass } from "three/examples/jsm/postprocessing/Pass";
import { ShaderPass } from "three/examples/jsm/Addons.js";

// Define custom shaders
// const vertexShader = `
//     attribute float size;
//     varying vec3 vColor;
//
//     void main() {
//       vColor = vec3(0.9, 0.2, 0.9); // Magenta color similar to your original
//       vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//       gl_PointSize = size * (300.0 / -mvPosition.z);
//       gl_Position = projectionMatrix * mvPosition;
//     }
//   `;
//
// const fragmentShader = `
//     uniform sampler2D pointTexture;
//     varying vec3 vColor;
//
//     void main() {
//       // Calculate distance from center of point
//       float distance = length(gl_PointCoord - vec2(0.5, 0.5));
//
//       // Discard pixels outside of our circle
//       if (distance > 0.5) discard;
//
//       // Calculate glow intensity based on distance from center
//       float intensity = 1.0 - distance * 2.0;
//       intensity = pow(intensity, 1.5); // Adjust power for glow shape
//
//       gl_FragColor = vec4(vColor, intensity);
//     }
//   `;

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
    const particleCount = 3000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 2); // x, y velocities
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() * -viewWidth) / 2 - viewWidth / 4; // x (left side)
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewHeight; // y (spread vertically)
      positions[i * 3 + 2] = 0; // z (depth)

      // Store original positions for swarming behavior
      originalPositions[i * 3] = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = 0;

      // Initial velocities
      velocities[i * 2] = 0.03 + Math.random() * 0.02; // x velocity
      velocities[i * 2 + 1] = (Math.random() - 0.5) * 0.01; // y velocity

      // Random sizes for particles
      sizes[i] = 0.05 + Math.random() * 0.03;
    }

    particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Create a circular texture for particles
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
    }
    const pointTexture = new THREE.CanvasTexture(canvas);

    // Define custom shaders
    const vertexShader = `
      attribute float size;
      uniform float time;
      varying vec3 vColor;
      
      void main() {
        // Magenta color similar to your original
        vColor = vec3(1.0, 0.0, 1.0);
        
        // Subtle pulsing effect based on time
        float pulse = sin(time * 1.5 + position.x * 0.5) * 0.1 + 0.9;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * pulse * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform sampler2D pointTexture;
      varying vec3 vColor;
      
      void main() {
        vec4 texColor = texture2D(pointTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor, texColor.a);
      }
    `;

    // Create shader material
    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: pointTexture },
        time: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
    });

    const particleMesh = new THREE.Points(particles, particleMat);
    scene.add(particleMesh);

    // Setup post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Add bloom pass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.8, // strength
      0.3, // radius
      0.1, // threshold (low value means more elements will glow)
    );
    composer.addPass(bloomPass);

    // Mouse tracking
    const mouse: THREE.Vector2 = new THREE.Vector2(-1000, -1000);
    const mouseRadius = 0.3;
    const mouseStrength = 1.5;

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
    const swarmRadius = 0.5;
    const swarmStrength = 0.02;
    const returnStrength = 0.01;
    const clock = new THREE.Clock();
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      // Update time uniform for shader
      particleMat.uniforms.time.value = time;

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
          positions[i * 3] -= Math.cos(angle + Math.PI / 2) * force * 0.2;
          positions[i * 3 + 1] -= Math.sin(angle + Math.PI / 2) * force * 0.2;

          // Add some velocity changes for persistence
          velocities[i * 2] -= Math.cos(angle) * force * 0.05;
          velocities[i * 2 + 1] -= Math.sin(angle) * force * 0.05;
        }

        // Swarm behavior - particles affect each other (optimized)
        if (i % 5 === 0) {
          // Only check every 5th particle as the influencer
          for (let j = 0; j < particleCount; j += 50) {
            // Check every 50th particle
            if (i !== j) {
              const otherX = positions[j * 3];
              const otherY = positions[j * 3 + 1];

              const dxSwarm = otherX - particleX;
              const dySwarm = otherY - particleY;
              const distSwarm = Math.sqrt(
                dxSwarm * dxSwarm + dySwarm * dySwarm,
              );

              if (distSwarm < swarmRadius && distSwarm > 0.01) {
                // Attraction to nearby particles
                positions[i * 3] += (dxSwarm / distSwarm) * swarmStrength;
                positions[i * 3 + 1] += (dySwarm / distSwarm) * swarmStrength;
              }
            }
          }
        }
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

      // Render with composer instead of renderer
      composer.render();
    };
    animate();

    // Handle container resize
    const handleResize = () => {
      const newWidth = mountNode.clientWidth;
      const newHeight = mountNode.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);

      // Update bloom pass resolution
      bloomPass.resolution.set(newWidth, newHeight);
    };

    // Create ResizeObserver for the container
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountNode);

    return () => {
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }

      window.removeEventListener("mousemove", handleMouseMove);

      // Stop animation
      cancelAnimationFrame(animationId);

      // Dispose resources
      particles.dispose();
      particleMat.dispose();
      renderer.dispose();

      // Dispose composer resources
      composer.renderTarget1.dispose();
      composer.renderTarget2.dispose();
    };
  }, []);

  return (
    <>
      <div className="three-scene" ref={mountRef}></div>
    </>
  );
}

export default ParticleShader;
