"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start the exit animation after a short delay
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1500);

    // Hide the transition after animation completes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-all duration-1000 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-center">
        {/* Main Flower Animation */}
        <div
          className={`transition-all duration-1000 ${
            isAnimating
              ? "scale-100 rotate-0 opacity-100"
              : "scale-150 rotate-180 opacity-0"
          }`}
        >
          <Image
            src="/images/flower.svg"
            alt="Loading flower"
            width={120}
            height={120}
            className="w-30 h-30 mx-auto"
            style={{
              filter: "none",
            }}
          />
        </div>

        {/* Shop Name Animation */}
        <div
          className={`mt-6 transition-all duration-1000 delay-300 ${
            isAnimating
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="text-3xl font-serif font-bold text-brand-dark">
            Blumenkunst am Gleis
          </h1>
          <p className="text-lg text-brand mt-2">Willkommen</p>
        </div>

        {/* Floating Petals Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute transition-all duration-2000 ${
                isAnimating ? "opacity-100" : "opacity-0"
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 200}ms`,
                animation: isAnimating
                  ? `floatPetal 3s ease-in-out infinite ${i * 0.5}s`
                  : "none",
              }}
            >
              <Image
                src="/images/flower.svg"
                alt="Floating petal"
                width={24}
                height={24}
                className="w-6 h-6"
                style={{
                  filter: "none",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes floatPetal {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
