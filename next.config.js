/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}'
        },
        '@mui/material': {
            transform: '@mui/material/{{member}}'
        },
        '@next/font': {
            transform: '@next/font/{{member}}'
        },
        'recharts': {
            transform: 'recharts/{{member}}'
        },
        'draft-js-export-markdown': {
            transform: 'draft-js-export-markdown/{{member}}'
        },
        'draft-js-import-markdown': {
            transform: 'draft-js-import-markdown/{{member}}'
        }
    },
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
