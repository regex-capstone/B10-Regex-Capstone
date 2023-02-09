/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
}

module.exports = nextConfig
