/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable features that might be causing CSS processing issues
  experimental: {
    // Disable experimental features related to CSS
    optimizeCss: false
  },
  // Don't customize webpack config
  swcMinify: true,
  output: 'standalone'
}

module.exports = nextConfig;
