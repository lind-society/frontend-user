/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // output: 'standalone',
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
