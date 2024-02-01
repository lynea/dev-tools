/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'ca.slack-edge.com',
            },
            {
                hostname: 'images.ctfassets.net',
            },
        ],
    },
}

module.exports = nextConfig
