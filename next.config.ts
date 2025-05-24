// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode to catch hydration issues early
  reactStrictMode: true,
  
  // Optimize for better hydration
  swcMinify: true,
  
  // Experimental features for better SSR/hydration
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Headers to prevent browser extension interference
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // Rewrites for cleaner API calls
  async rewrites() {
    return [
      {
        source: '/api/pages/:path*',
        destination: '/api/pages/:path*',
      },
    ]
  },
}

module.exports = nextConfig