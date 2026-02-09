import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {},
};

export default withMDX(nextConfig);

// Note: If you encounter ChunkLoadError with HeroUI dom-animation,
// try clearing .next folder: rm -rf .next
// and rebuilding: npm run build
