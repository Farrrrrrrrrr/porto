/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Same for TypeScript errors
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
  },
  experimental: {
    // This will allow Next.js to attempt more aggressive optimizations
    optimizeFonts: true,
    optimizePackageImports: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  // For Vercel deployments, ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
};

module.exports = nextConfig;
