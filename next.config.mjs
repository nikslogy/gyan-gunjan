/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {

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
    workerThreads: false,
  },
  webpack: (config, { isServer }) => {
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
  },
  async rewrites() {
    return [
      // Handle API requests
      {
        source: '/api/:path*',
        destination: 'http://143.244.132.118/api/:path*',
      },
      // Handle direct requests to the base URL
      {
        source: '/:path*',
        destination: 'http://143.244.132.118/:path*',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: 'image/*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;