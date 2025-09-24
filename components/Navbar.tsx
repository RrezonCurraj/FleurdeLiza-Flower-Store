"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only change to solid background after scrolling past the hero section
      setIsScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center h-full">
            <div className="w-14 h-14 flex items-center justify-center">
              <Image
                src="/icons/logo.svg"
                alt="Blumenladen Logo"
                width={56}
                height={56}
                className="object-contain transition-all duration-300"
                style={{
                  filter: isScrolled ? "none" : "brightness(0) invert(1)",
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-brand-dark hover:text-brand"
                  : "text-white hover:text-white/80"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-brand-dark hover:text-brand"
                  : "text-white hover:text-white/80"
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-brand-dark hover:text-brand"
                  : "text-white hover:text-white/80"
              }`}
            >
              Über uns
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`transition-colors duration-200 font-medium ${
                isScrolled
                  ? "text-brand-dark hover:text-brand"
                  : "text-white hover:text-white/80"
              }`}
            >
              Kontakt
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-all duration-300 transform hover:scale-110 ${
                isScrolled
                  ? "text-brand-dark hover:text-brand"
                  : "text-white hover:text-white/80"
              }`}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`backdrop-blur-md shadow-lg rounded-lg mt-2 p-4 transition-all duration-300 ${
              isScrolled ? "bg-white/95" : "bg-black/20"
            }`}
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className={`transition-all duration-300 font-medium text-left py-2 px-3 rounded-lg transform hover:scale-105 hover:bg-white/10 ${
                  isScrolled
                    ? "text-brand-dark hover:text-brand"
                    : "text-white hover:text-white/80"
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? "0.1s" : "0s",
                }}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className={`transition-all duration-300 font-medium text-left py-2 px-3 rounded-lg transform hover:scale-105 hover:bg-white/10 ${
                  isScrolled
                    ? "text-brand-dark hover:text-brand"
                    : "text-white hover:text-white/80"
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? "0.2s" : "0s",
                }}
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className={`transition-all duration-300 font-medium text-left py-2 px-3 rounded-lg transform hover:scale-105 hover:bg-white/10 ${
                  isScrolled
                    ? "text-brand-dark hover:text-brand"
                    : "text-white hover:text-white/80"
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? "0.3s" : "0s",
                }}
              >
                Über uns
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`transition-all duration-300 font-medium text-left py-2 px-3 rounded-lg transform hover:scale-105 hover:bg-white/10 ${
                  isScrolled
                    ? "text-brand-dark hover:text-brand"
                    : "text-white hover:text-white/80"
                }`}
                style={{
                  animationDelay: isMobileMenuOpen ? "0.4s" : "0s",
                }}
              >
                Kontakt
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
