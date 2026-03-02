/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Webpack configuration for development watch using polling
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      poll: 1000, // Check for changes every 1 second
      aggregateTimeout: 300,
      ignored: ['**/node_modules', '**/.git', '**/.next', '**/dist'],
    };
    return config;
  },
};

module.exports = nextConfig;
