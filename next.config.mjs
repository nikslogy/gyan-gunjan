/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '143.244.132.118',
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests"
          }
        ],
      }
    ]
  },
  async rewrites() {
    return [
      // Handle API requests
      {
        source: '/api/:path*',
        destination: 'http://143.244.132.118/api/:path*',
      },
      // Handle all other paths (for images, etc)
      {
        source: '/:path*',
        destination: 'http://143.244.132.118/:path*',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: '(image|video|audio|application).*',
          },
        ],
      },
    ];
  },
};

export default nextConfig;