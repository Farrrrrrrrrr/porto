/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
    missingSuspenseWithCSR: false,
  },
  webpack: (config) => {
    // Ignore issues with missing modules during build
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { file: /src\/pages/ },
    ];
    return config;
  },
  images: {
    domains: ['localhost'],
  },
  // This tells Next.js to ignore certain modules during server-side rendering
  serverComponentsExternalPackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

module.exports = nextConfig;
