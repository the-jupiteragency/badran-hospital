import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Specific Cloudinary and Strapi Railway domains for security
    remotePatterns: [
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      // Strapi Railway backend
      {
        protocol: "https",
        hostname: "badran-hospital-backend-production.up.railway.app",
        pathname: "/**",
      },
      // Allow any https host as fallback (for other CDNs)
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
    ],
    dangerouslyAllowSVG: true,
    // Enable optimization in all environments
    unoptimized: false,
    // Image format optimization
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },
};

export default withNextVideo(nextConfig, { folder: "videos" });
