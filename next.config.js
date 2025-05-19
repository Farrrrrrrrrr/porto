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
    // Turn off the legacy support for the Pages Router
    missingSuspenseWithCSR: true,
  },
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig;
