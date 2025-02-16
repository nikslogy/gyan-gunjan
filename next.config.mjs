/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['143.244.132.118', 'gyan-gunjan.vercel.app'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '143.244.132.118',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    workerThreads: false,  // Let's disable this temporarily
  },
  webpack: (config, { isServer }) => {
    // Add fallbacks for node modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      fs: false,
      path: false,
      http: false,
      https: false,
      url: false,
      util: false,
      zlib: false,
      stream: false,
      crypto: false
    };

    // Ignore canvas in server-side builds
    if (isServer) {
      config.externals = [...config.externals, 'canvas'];
    }

    return config;
  }
};

export default nextConfig;