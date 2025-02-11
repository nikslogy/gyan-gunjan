/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['127.0.0.1'], // Add your Django backend's domain or IP
      },
    webpack: (config) => {
        config.resolve.alias.pdfjs = 'pdfjs-dist/legacy/build/pdf';
        return config;
    },
    experimental: {
        optimizeCss: true,
        workerThreads: true,
    }
};

export default nextConfig;
