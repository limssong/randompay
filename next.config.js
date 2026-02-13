/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/randompay' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/randompay' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

