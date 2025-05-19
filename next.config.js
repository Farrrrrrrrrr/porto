/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  swcMinify: true,
  output: 'standalone',
  experimental: {
    optimizeCss: true, // This enables CSS optimization
  },
  webpack: (config) => {
    // Simplify CSS processing
    const rules = config.module.rules;
    const cssRule = rules.find(rule => rule.oneOf && rule.oneOf.some(r => r.test && r.test.toString().includes('css')));
    
    if (cssRule && cssRule.oneOf) {
      cssRule.oneOf.forEach(rule => {
        if (rule.use && Array.isArray(rule.use)) {
          rule.use.forEach(u => {
            if (u.loader && u.loader.includes('css-loader')) {
              // Simplify CSS options
              u.options = {
                ...u.options,
                importLoaders: 1
              };
            }
            if (u.loader && u.loader.includes('postcss-loader')) {
              // Use simple PostCSS config
              u.options = {
                postcssOptions: {
                  plugins: ['tailwindcss', 'autoprefixer']
                }
              };
            }
          });
        }
      });
    }
    
    return config;
  },
}

module.exports = nextConfig;
