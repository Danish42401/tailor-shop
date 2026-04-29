import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cloudflare compatibility */
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Recommended for Cloudflare builds
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
