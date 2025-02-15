/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1'],
  },
  experimental: {
    optimizeCss: true,
    workerThreads: false,  // Let's disable this temporarily
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        canvas: false,
      };
    }
    return config;
  }
};

export default nextConfig;