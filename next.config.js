/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    // Exclude client-only modules from SSR
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
  // Disable CSS modules to simplify build
  cssModules: false,
}

module.exports = nextConfig;
