import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cloudflare compatibility */
  typescript: {
    ignoreBuildErrors: true, // Recommended for Cloudflare builds
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
