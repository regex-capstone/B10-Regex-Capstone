/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {},
    webpack(config, { isServer }) {
        config.experiments = { ...config.experiments, topLevelAwait: true }

        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false
            }
        }

        return config
    },
}

module.exports = nextConfig
