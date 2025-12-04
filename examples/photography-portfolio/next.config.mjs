import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactCompiler: false,
  },
  // Transpile monorepo packages
  transpilePackages: ['@qwickapps/cms', '@qwickapps/react-framework', '@qwickapps/schema'],
  // Externalize server-side packages
  serverExternalPackages: ['thread-stream', 'pino', 'pino-pretty'],
  images: {
    // Skip image optimization for external images (avoids SSL issues with corporate proxies)
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withPayload(nextConfig);
