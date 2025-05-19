/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable PostCSS processing to troubleshoot build issues
  experimental: {
    esmExternals: true
  },
  webpack: (config) => {
    // Force CSS resolution
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!one.issuer && one.use && one.use.length > 0) {
            one.use.forEach((u) => {
              if (u.loader && u.loader.includes('css-loader') && !u.loader.includes('postcss-loader')) {
                u.options = {
                  ...u.options,
                  importLoaders: 1,
                };
              }
              if (u.loader && u.loader.includes('postcss-loader')) {
                u.options = {
                  ...u.options,
                  postcssOptions: {
                    plugins: [
                      require('tailwindcss'),
                      require('autoprefixer'),
                    ],
                  },
                };
              }
            });
          }
        });
      }
    });
    
    return config;
  },
}

module.exports = nextConfig
