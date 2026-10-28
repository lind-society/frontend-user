/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * In production, uploaded files are served through the API itself
 * (`/api/v1/storages/files/...`), so the API's own host has to be allowed for
 * next/image. Derived from the env so switching to a domain needs no code edit.
 */
const apiHostPattern = (() => {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!raw) return [];
  try {
    const url = new URL(raw);
    return [
      {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port,
        pathname: '/**',
      },
    ];
  } catch {
    return [];
  }
})();

const nextConfig = {
  output: 'standalone',
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
      ...apiHostPattern,
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
