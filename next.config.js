/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://k-energysaveadmin.com',
  },
  // Enable standalone output for Cloudflare Workers
  output: 'standalone',
}

module.exports = nextConfig
