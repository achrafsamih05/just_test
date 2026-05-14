/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow remote product images. Tighten this list per your real CDN/hosts.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  eslint: {
    // Allow `next build` to succeed even if there are lint warnings; keep
    // `npm run lint` separate as a CI gate.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
