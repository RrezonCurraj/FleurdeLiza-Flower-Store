import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove turbopack config for production builds
  ...(process.env.NODE_ENV === "development" && {
    turbopack: {
      root: process.cwd(),
    },
  }),
};

export default nextConfig;
