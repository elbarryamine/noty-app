/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  tsconfigPath: 'tsconfig.json',
};

module.exports = nextConfig;
