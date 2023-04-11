/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');

const nextConfig = {
    reactStrictMode: true,
    lessLoaderOptions: {},
    images: {
        domains: ['ant-cra.cremawork.com', 'cremawork.com'],
    },
};

module.exports = withLess(nextConfig);
