import "./MovingDotsBG.scss";
import { ReactElement, useEffect, useState } from "react";

function MovingDotsBG(): ReactElement {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    // Generate initial particles
    const generateParticle = (id: any) => ({
      id,
      x: Math.random() * 100,
      y: 110, // Start below the screen
      size: Math.random() * 4 + 1,
      speedY: Math.random() * 0.8 + 0.3, // Upward speed
      opacity: Math.random() * 0.7 + 0.3,
      life: 0, // Track particle life for fading
    });

    const particleArray: any = [];
    for (let i = 0; i < 60; i++) {
      particleArray.push({
        ...generateParticle(i),
        y: Math.random() * 120, // Initial spread
      });
    }
    setParticles(particleArray);

    // Animate particles flowing upward
    const animateParticles = () => {
      setParticles((prevParticles: any) => {
        let newParticles = prevParticles.map((particle: any) => ({
          ...particle,
          y: particle.y - particle.speedY,
          life: particle.life + 1,
          opacity:
            particle.y > 80
              ? Math.max(0, particle.opacity - 0.02) // Fade out near top
              : Math.min(particle.opacity + 0.01, 0.7), // Fade in
        }));

        // Remove particles that have moved off screen or faded out
        newParticles = newParticles.filter(
          (p: any) => p.y > -10 && p.opacity > 0,
        );

        // Add new particles from bottom
        while (newParticles.length < 60) {
          const newId = Date.now() + Math.random();
          newParticles.push(generateParticle(newId));
        }

        return newParticles;
      });
    };

    const interval = setInterval(animateParticles, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="moving-dots">
        {particles.map((particle: any) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px rgba(168, 85, 247, 0.4)`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default MovingDotsBG;
