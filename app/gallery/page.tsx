"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PageTransition from "../../components/PageTransition";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const galleryImages = [
    {
      src: "/images/flw1.jpg",
      alt: "Beautiful flower arrangement 1",
    },
    {
      src: "/images/flw2.png",
      alt: "Beautiful flower arrangement 2",
    },
    {
      src: "/images/flw3.png",
      alt: "Beautiful flower arrangement 3",
    },
    {
      src: "/images/flw4.png",
      alt: "Beautiful flower arrangement 4",
    },
    {
      src: "/images/flw5.png",
      alt: "Beautiful flower arrangement 5",
    },
    {
      src: "/images/flw6.png",
      alt: "Beautiful flower arrangement 6",
    },
    {
      src: "/images/flw7.png",
      alt: "Beautiful flower arrangement 7",
    },
    {
      src: "/images/flw8.png",
      alt: "Beautiful flower arrangement 8",
    },
    {
      src: "/images/flw9.png",
      alt: "Beautiful flower arrangement 9",
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Page Transition */}
      <PageTransition />

      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center">
                <Image
                  src="/icons/logo.svg"
                  alt="Blumenladen Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>
            <Link
              href="/"
              className="gradient-brand text-white px-6 py-3 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </header>

      {/* Gallery Header */}
      <section className="py-16 bg-gradient-to-br from-brand-light/10 to-brand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-brand"></div>
            <div className="mx-6">
              <Image
                src="/images/flower.svg"
                alt="Decorative flower"
                width={60}
                height={60}
                className="w-15 h-15"
              />
            </div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-brand"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark mb-6">
            Unsere Blumen-Galerie
          </h1>
          <p className="text-xl text-dark-200 max-w-2xl mx-auto">
            Entdecken Sie die Vielfalt und Schönheit unserer Blumenauswahl in
            voller Pracht
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className="aspect-square relative cursor-pointer"
                  onClick={() => openLightbox(image.src)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="gradient-brand text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg flex items-center">
                      <Image
                        src="/images/flower.svg"
                        alt="Flower icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 mr-2"
                        style={{ filter: "brightness(0) invert(1)" }}
                      />
                      Vergrößern
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-brand transition-colors duration-200 z-10"
            >
              ✕
            </button>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Gallery image"
                width={800}
                height={600}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm flex items-center">
                <Image
                  src="/images/flower.svg"
                  alt="Flower icon"
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                Klicken Sie außerhalb zum Schließen
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-brand hover:bg-brand-dark text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="Nach oben scrollen"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
