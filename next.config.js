/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Necessary to prevent build failures related to PostCSS
  webpack: (config) => {
    // Find the PostCSS loader rule
    const rules = config.module.rules;
    const postCSSRule = rules.find(
      (rule) => rule.oneOf?.find((r) => r.test?.toString().includes('css'))
    );

    if (postCSSRule) {
      const cssRule = postCSSRule.oneOf.find(
        (r) => r.test?.toString().includes('css')
      );
      if (cssRule && cssRule.use) {
        // Replace PostCSS options with minimal configuration
        cssRule.use.forEach((rule) => {
          if (rule.loader && rule.loader.includes('postcss-loader')) {
            rule.options = {
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer'],
              },
            };
          }
        });
      }
    }
    return config;
  },
  // Explicitly set output
  output: 'standalone',
}

module.exports = nextConfig;
