/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "ca.slack-edge.com",
      },
      {
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

module.exports = nextConfig;
