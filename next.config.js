const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    // The site shows the 20 litre photo once this file exists, and an illustration until then.
    NEXT_PUBLIC_HAS_20L_PHOTO: String(
      fs.existsSync(path.join(__dirname, 'public/bottles/vaari-20l.png')),
    ),
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

