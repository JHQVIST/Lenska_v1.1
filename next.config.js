/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['images.unsplash.com', 'example.com'],
    unoptimized: true,
  },
  // Ensure public folder is included in build
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/**/*'],
    },
  },
}

module.exports = nextConfig
