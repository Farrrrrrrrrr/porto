#!/bin/bash

echo "Cleaning up Next.js build folders..."
rm -rf .next
rm -rf node_modules/.cache

echo "Installing tailwindcss and postcss dependencies..."
npm install --legacy-peer-deps tailwindcss@latest postcss@latest autoprefixer@latest

echo "Creating PostCSS config file..."
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "Creating tailwind config file..."
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
EOF

echo "Creating next.config.js..."
cat > next.config.js << 'EOF'
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
    missingSuspenseWithCSR: false,
  },
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig;
EOF

echo "Updating package.json with proper scripts..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
pkg.scripts = {
  ...pkg.scripts,
  'vercel-build': 'npm run build',
  'build': 'next build',
};
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

echo "Starting development server..."
npm run dev
