/**
 * Next.js Configuration
 *
 * This file configures Next.js framework settings for the entertainment app.
 * Currently using default configuration, but can be extended with:
 * - Image optimization settings
 * - Environment variables
 * - Build optimizations
 * - Custom webpack configuration
 * - API routes configuration
 */

import type { NextConfig } from "next";

/**
 * Next.js configuration object
 * Defines framework settings and build options
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
};

export default nextConfig;
