import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Mevzuat belge yüklemeleri için (varsayılan 1 MB)
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
