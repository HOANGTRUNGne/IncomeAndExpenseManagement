/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['ant-cra.cremawork.com', 'cremawork.com'],
    },
    experimental: {
        optimizeCss: true,
    },
};

module.exports = nextConfig;
