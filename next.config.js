/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
    },
    eslint: {
        // Allow production builds to complete even with ESLint warnings
        ignoreDuringBuilds: false,
    },
    // Skip pre-rendering for pages with dynamic search params
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
}

module.exports = nextConfig
