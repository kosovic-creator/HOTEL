import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hotel/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
