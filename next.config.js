/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ca.slack-edge.com",
      },
    ],
  },
};

module.exports = nextConfig;
