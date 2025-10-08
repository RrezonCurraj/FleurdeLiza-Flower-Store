"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import PageTransition from "../components/PageTransition";
// Removed direct EmailJS import - now using API route

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  const openLightbox = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({
        type: "error",
        message: "Bitte geben Sie Ihren Namen ein.",
      });
      return false;
    }
    if (!formData.email.trim()) {
      setFormStatus({
        type: "error",
        message: "Bitte geben Sie Ihre E-Mail-Adresse ein.",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus({
        type: "error",
        message: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({
        type: "error",
        message: "Bitte geben Sie eine Nachricht ein.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({ type: "loading", message: "Nachricht wird gesendet..." });

    try {
      // Send email using secure API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      setFormStatus({
        type: "success",
        message:
          "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns bald bei Ihnen.",
      });

      // Reset form
      setFormData({ name: "", email: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: "idle", message: "" });
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setFormStatus({
        type: "error",
        message:
          "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns telefonisch.",
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Page Transition */}
      <PageTransition />

      {/* Floating Petal Animation Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-petal opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            <Image
              src="/images/flower.svg"
              alt="Floating flower"
              width={64}
              height={64}
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>
        ))}
      </div>
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover object-[20%_center] sm:object-center"
          >
            <source src="/images/flowervid.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight relative">
            <span
              className="inline-block animate-blur-reveal"
              style={{ animationDelay: "0.5s" }}
            >
              Blumenkunst am Gleis
            </span>
            <span
              className="block animate-blur-reveal"
              style={{ animationDelay: "1s" }}
            >
              Blumenladen
            </span>
          </h1>

          <p
            className="text-xl sm:text-2xl text-white/90 mb-8 max-w-1xl mx-auto leading-relaxed animate-blur-reveal"
            style={{ animationDelay: "1.5s" }}
          >
            Ihr Blumenladen im Herzen von Biel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => scrollToSection("gallery")}
              className="gradient-brand text-white text-lg px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl animate-blur-reveal"
              style={{ animationDelay: "2s" }}
            >
              Unsere Galerie entdecken
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-lg px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300 border-2 border-white text-white hover:bg-white hover:text-brand-dark animate-blur-reveal"
              style={{ animationDelay: "2.2s" }}
            >
              Kontakt aufnehmen
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section bg-white relative">
        {/* Lily Decorative Elements */}
        <div className="absolute top-0 left-0 w-48 h-48 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={192}
            height={192}
            className="w-48 h-48"
          />
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={192}
            height={192}
            className="w-48 h-48"
          />
        </div>
        <div className="absolute bottom-0 left-1/4 w-40 h-40 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={160}
            height={160}
            className="w-40 h-40"
          />
        </div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={160}
            height={160}
            className="w-40 h-40"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-brand"></div>
              <div className="mx-4">
                <Image
                  src="/images/flower.svg"
                  alt="Decorative flower"
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-brand"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark mb-6">
              Unsere Blumen-Galerie
            </h2>
            <p className="text-xl text-dark-200 max-w-2xl mx-auto">
              Lassen Sie sich von der Vielfalt und Schönheit unserer
              Blumenauswahl inspirieren
            </p>
          </div>

          {/* Mobile: Horizontal Scroll Gallery */}
          <div className="md:hidden">
            <div
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
            >
              {[
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
              ].map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 snap-center"
                  style={{ width: "280px" }}
                >
                  <div
                    className="aspect-square relative cursor-pointer"
                    onClick={() => openLightbox(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="gradient-brand text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg flex items-center text-sm">
                        <Image
                          src="/images/flower.svg"
                          alt="Flower icon"
                          width={16}
                          height={16}
                          className="w-4 h-4 mr-2"
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

          {/* Desktop: Grid Gallery */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div
                  className="aspect-square relative cursor-pointer"
                  onClick={() => openLightbox(image.src)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
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

          {/* Gallery View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="gradient-brand text-white text-lg px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            >
              <Image
                src="/images/flower.svg"
                alt="Flower icon"
                width={24}
                height={24}
                className="w-6 h-6 mr-3"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              Alle Blumen anzeigen
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="section bg-brand-bg relative overflow-hidden"
      >
        {/* Lily Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10">
            <Image
              src="/images/flower.svg"
              alt="Decorative flower"
              width={96}
              height={96}
              className="w-24 h-24"
            />
          </div>
          <div className="absolute top-20 right-20">
            <Image
              src="/images/flower.svg"
              alt="Decorative flower"
              width={84}
              height={84}
              className="w-21 h-21"
            />
          </div>
          <div className="absolute bottom-20 left-20">
            <Image
              src="/images/flower.svg"
              alt="Decorative flower"
              width={108}
              height={108}
              className="w-27 h-27"
            />
          </div>
          <div className="absolute bottom-10 right-10">
            <Image
              src="/images/flower.svg"
              alt="Decorative flower"
              width={96}
              height={96}
              className="w-24 h-24"
            />
          </div>
          <div className="absolute top-1/2 left-1/4">
            <Image
              src="/images/flower.svg"
              alt="Decorative flower"
              width={72}
              height={72}
              className="w-18 h-18"
            />
          </div>
          <div className="absolute top-1/3 right-1/3">
            <Image
              src="/images/flower.svg"
              alt="Decorative flower"
              width={84}
              height={84}
              className="w-21 h-21"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
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
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark mb-6">
              Über uns
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-dark-200 mb-6 leading-relaxed">
                Seit über 20 Jahren sind wir Ihr vertrauensvoller Partner für
                alle floristischen Anlässe. Unser Team aus erfahrenen Floristen
                und Gärtnern sorgt dafür, dass Sie stets die frischesten und
                schönsten Blumen erhalten.
              </p>
              <p className="text-lg text-dark-200 mb-8 leading-relaxed">
                Von der Hochzeitsdekoration bis zum Geburtstagsstrauß - wir
                verwandeln Ihre Wünsche in wunderschöne Blumenarrangements, die
                unvergessliche Momente schaffen.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand mb-2">20+</div>
                  <div className="text-dark-200">Jahre Erfahrung</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand mb-2">
                    1000+
                  </div>
                  <div className="text-dark-200">Zufriedene Kunden</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-brand-light/30 to-brand/50 rounded-2xl flex items-center justify-center shadow-lg">
                <Image
                  src="/icons/logo.svg"
                  alt="About our flower shop"
                  width={300}
                  height={300}
                  className="object-contain opacity-80"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-white relative">
        {/* Lily Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-36 h-36 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={144}
            height={144}
            className="w-36 h-36"
          />
        </div>
        <div className="absolute top-0 right-1/4 w-36 h-36 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={144}
            height={144}
            className="w-36 h-36"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={192}
            height={192}
            className="w-48 h-48"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-10">
          <Image
            src="/images/flower.svg"
            alt="Decorative flower"
            width={192}
            height={192}
            className="w-48 h-48"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-brand"></div>
              <div className="mx-4">
                <Image
                  src="/images/flower.svg"
                  alt="Decorative flower"
                  width={60}
                  height={60}
                  className="w-15 h-15"
                />
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-brand"></div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-brand-dark mb-6">
              Kontakt
            </h2>
            <p className="text-xl text-dark-200 max-w-2xl mx-auto">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Wir
              freuen uns auf Ihre Nachricht!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card">
              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">
                Schreiben Sie uns
              </h3>
              <form onSubmit={handleSubmit}>
                {/* Status Message */}
                {formStatus.message && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      formStatus.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : formStatus.type === "error"
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-dark mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                    placeholder="Ihr Name"
                    disabled={formStatus.type === "loading"}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-dark mb-2"
                  >
                    E-Mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                    placeholder="ihre@email.de"
                    disabled={formStatus.type === "loading"}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-dark mb-2"
                  >
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-all duration-200"
                    placeholder="Ihre Nachricht an uns..."
                    disabled={formStatus.type === "loading"}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus.type === "loading"}
                  className={`w-full text-white text-lg py-4 rounded-lg transform transition-all duration-300 shadow-lg hover:shadow-xl ${
                    formStatus.type === "loading"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "gradient-brand hover:scale-105"
                  }`}
                >
                  {formStatus.type === "loading" ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Wird gesendet...
                    </span>
                  ) : (
                    "Nachricht senden"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="card">
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6">
                  Unsere Kontaktdaten
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                      <span className="text-brand">📍</span>
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">
                        Adresse
                      </div>
                      <div className="text-dark-200">
                        Bahnhofplatz 4
                        <br />
                        2502 Biel/Bienne
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                      <span className="text-brand">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">
                        Telefon
                      </div>
                      <div className="text-dark-200">+49 (0) 123 456 789</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                      <span className="text-brand">✉️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">
                        E-Mail
                      </div>
                      <div className="text-dark-200">info@fleurdeliza.ch</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                      <span className="text-brand">🕒</span>
                    </div>
                    <div>
                      <div className="font-semibold text-brand-dark">
                        Öffnungszeiten
                      </div>
                      <div className="text-dark-200">
                        Mo-Fr: 8:00 - 18:00
                        <br />
                        Sa: 9:00 - 16:00
                        <br />
                        So: Geschlossen
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="card p-0 overflow-hidden">
                <div className="aspect-video relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!4v1758743729952!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ18yZkdhaVFF!2m2!1d47.13327903066576!2d7.24186638655388!3f175.51!4f6.890000000000001!5f0.4000000000000002"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Fleur de Liza Location - Bahnhofplatz 4, Biel/Bienne"
                    className="rounded-lg"
                  />

                  {/* Google Maps Button Overlay */}
                  <div className="absolute top-4 right-4">
                    <a
                      href="https://maps.google.com/maps?q=Bahnhofplatz+4,+2502+Biel/Bienne,+Switzerland"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 text-sm font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span>In Google Maps öffnen</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src="/icons/logo.svg"
                    alt="Blumenladen Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
              </div>
              <p className="text-white leading-relaxed">
                Ihr vertrauensvoller Partner für alle floristischen Anlässe.
                Frische Blumen und professionelle Beratung seit über 20 Jahren.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">
                Schnelllinks
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("home")}
                  className="block text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="block text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="block text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Über uns
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="block text-white/80 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  Kontakt
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Kontakt</h4>
              <div className="space-y-2">
                <p className="text-white">Bahnhofplatz 4, 2502 Biel/Bienne</p>

                <p className="text-white">+49 --- ---</p>
                <p className="text-white">info@fleurdeliza.ch</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white">
              &copy; 2025 Blumenladen. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>

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
