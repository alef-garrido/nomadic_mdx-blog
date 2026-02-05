import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  turbopack: {},
};

export default nextConfig;

// Note: If you encounter ChunkLoadError with HeroUI dom-animation,
// try clearing .next folder: rm -rf .next
// and rebuilding: npm run build
