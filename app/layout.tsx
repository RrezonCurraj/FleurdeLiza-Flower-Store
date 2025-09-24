import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./app.css";
import ConditionalNavbar from "../components/ConditionalNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blumenladen - Ihr lokaler Blumenladen für besondere Momente",
  description:
    "Entdecken Sie unsere wunderschöne Auswahl an frischen Blumen und Pflanzen. Professionelle Floristik für Hochzeiten, Geburtstage und alle besonderen Anlässe.",
  keywords:
    "Blumen, Floristik, Blumenladen, Hochzeitsblumen, Geburtstagsblumen, Pflanzen, frisch",
  authors: [{ name: "Blumenladen Team" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/images/flower.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Blumenladen - Ihr lokaler Blumenladen",
    description:
      "Entdecken Sie unsere wunderschöne Auswahl an frischen Blumen und Pflanzen.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/images/flower.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
