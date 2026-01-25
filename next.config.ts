import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  reactCompiler: true,
  images: {
    // Allow images from any domain since og:images come from everywhere
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
