/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Remove any webpack customizations that may cause issues
  swcMinify: true,
  output: 'standalone'
}

module.exports = nextConfig;
