/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  // output: 'standalone',
  eslint: {
    dirs: ['src'],
  },

  images: {
    /**
     * Villa/property/activity photos come from object storage, so next/image
     * needs the host allow-listed or it throws "hostname is not configured"
     * — a hard render error that takes down the whole page (not just a
     * broken image), landing on app/error.tsx. This is exactly what happened
     * when MINIO_PUBLIC_BASE_URL was pointed at a Cloudflare quick tunnel
     * (backend/.env) whose domain wasn't listed here yet.
     *
     * Quick tunnel hostnames are random and rotate on every `cloudflared`
     * restart, so a wildcard is used instead of the one currently in
     * backend/.env — pinning today's random subdomain would just break again
     * on the next restart.
     */
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.trycloudflare.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**',
      },
    ],
  },

  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
