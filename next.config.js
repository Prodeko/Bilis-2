/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  output: 'standalone',
  experimental: {
    swcPlugins: [['next-superjson-plugin', {}]],
  },
}

module.exports = nextConfig
