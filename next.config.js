/* eslint-disable tsdoc/syntax */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // This enables server components to work with sequelize ORM
  experimental: {
    serverComponentsExternalPackages: ['sequelize'],
  },
  output: 'standalone',
}

module.exports = nextConfig
