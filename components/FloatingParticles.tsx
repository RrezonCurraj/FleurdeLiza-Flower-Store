"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  delay: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const createParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = 12; // Increased number of floating particles

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 50 + 40, // 40-90px (even bigger)
          speed: Math.random() * 0.5 + 0.2, // 0.2-0.7
          direction: Math.random() * Math.PI * 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2, // -1 to 1 degrees per frame
          opacity: Math.random() * 0.5 + 0.4, // 0.4-0.9 (much more visible)
          delay: Math.random() * 2000, // 0-2 seconds delay
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    // Animation loop
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + Math.cos(particle.direction) * particle.speed;
          let newY = particle.y + Math.sin(particle.direction) * particle.speed;

          // Wrap around screen edges
          if (newX > window.innerWidth + 50) newX = -50;
          if (newX < -50) newX = window.innerWidth + 50;
          if (newY > window.innerHeight + 50) newY = -50;
          if (newY < -50) newY = window.innerHeight + 50;

          // Slight direction change for organic movement
          const directionChange = (Math.random() - 0.5) * 0.1;
          const newDirection = particle.direction + directionChange;

          return {
            ...particle,
            x: newX,
            y: newY,
            direction: newDirection,
            rotation: particle.rotation + particle.rotationSpeed,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50); // 20 FPS

    // Handle window resize
    const handleResize = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }))
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => {
        // Check if particle is in the footer area (bottom 20% of screen)
        const isInFooter = particle.y > window.innerHeight * 0.8;
        const footerSize = particle.size * 1.5; // Make 50% bigger in footer

        return (
          <div
            key={particle.id}
            className="absolute transition-all duration-1000 ease-out"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}ms`,
            }}
          >
            <Image
              src="/images/flower.svg"
              alt="Floating flower particle"
              width={isInFooter ? footerSize : particle.size}
              height={isInFooter ? footerSize : particle.size}
              className="w-auto h-auto"
              style={{
                width: `${isInFooter ? footerSize : particle.size}px`,
                height: `${isInFooter ? footerSize : particle.size}px`,
                filter: isInFooter
                  ? "brightness(0) invert(1)" // White in footer
                  : "sepia(1) saturate(1.5) hue-rotate(25deg) brightness(0.8) contrast(1.2)", // Brand color on white background
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
