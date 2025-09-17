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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
