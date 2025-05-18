import { ReactElement } from "react";

// Define custom shaders
const vertexShader = `
    attribute float size;
    varying vec3 vColor;
    
    void main() {
      vColor = vec3(0.9, 0.2, 0.9); // Magenta color similar to your original
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

const fragmentShader = `
    uniform sampler2D pointTexture;
    varying vec3 vColor;
    
    void main() {
      // Calculate distance from center of point
      float distance = length(gl_PointCoord - vec2(0.5, 0.5));
      
      // Discard pixels outside of our circle
      if (distance > 0.5) discard;
      
      // Calculate glow intensity based on distance from center
      float intensity = 1.0 - distance * 2.0;
      intensity = pow(intensity, 1.5); // Adjust power for glow shape
      
      gl_FragColor = vec4(vColor, intensity);
    }
  `;

function ParticleShader(): ReactElement {
  return (
    <>
      <div className="three-scene"></div>
    </>
  );
}

export default ParticleShader;
