/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove the direct require of tailwindcss
  webpack: (config) => {
    return config;
  },
  // Simplify the build process
  swcMinify: true,
  output: 'standalone'
}

module.exports = nextConfig;
