import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for low-memory environments
  experimental: {
    // Reduce memory usage
    optimizePackageImports: ['@sanity/client', '@sanity/image-url'],
  },
  // Enable ISR for Sanity content (revalidate every 60 seconds)
  // This means content updates from Sanity will appear within 60 seconds
};

export default nextConfig;
