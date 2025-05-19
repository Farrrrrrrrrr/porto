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
  experimental: {
    // This will allow Next.js to attempt more aggressive optimizations
    optimizeFonts: true,
  },
  webpack: (config) => {
    // This is to handle the peer dependency mismatch
    config.resolve.alias = {
      ...config.resolve.alias,
      // Force using the same React version for @react-three/fiber
      'react': require.resolve('react'),
      'react-dom': require.resolve('react-dom')
    };
    return config;
  },
};

module.exports = nextConfig;
