/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hotel/database', '@hotel/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
  },
};

module.exports = nextConfig;