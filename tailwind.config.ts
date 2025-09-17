import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#af875e",
          light: "#c9a882",
          dark: "#8c6848",
          accent: "#d4b996",
          bg: "#f8f4f0",
          text: "#3a2c20",
        },
        dark: {
          200: "#475467",
        },
        light: {
          100: "#fafafa",
          200: "#f5f2ef",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(to right, #af875e, #d4b996)",
      },
    },
  },
  plugins: [],
};

export default config;
