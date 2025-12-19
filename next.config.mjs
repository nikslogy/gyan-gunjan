// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {

//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'admin.iksgyangunjan.in',
//         port: '',
//         pathname: '/media/**',
//       },
//       {
//         protocol: 'http',
//         hostname: '127.0.0.1',
//         port: '8000',
//         pathname: '/media/**',
//       },
//     ],

//   },
//   experimental: {
//     optimizeCss: true,
//     workerThreads: false,
//   },
//   webpack: (config, { isServer }) => {
//     config.resolve.fallback = {
//       ...config.resolve.fallback,
//       canvas: false,
//       fs: false,
//       path: false,
//       http: false,
//       https: false,
//       url: false,
//       util: false,
//       zlib: false,
//       stream: false,
//       crypto: false
//     };

//     // Ignore canvas in server-side builds
//     if (isServer) {
//       config.externals = [...config.externals, 'canvas'];
//     }

//     return config;
//   },
//   async rewrites() {
//     return [
//       // Handle API requests
//       {
//         source: '/api/:path*',
//         destination: 'http://143.244.132.118:8000/api/:path*',
//       },
//       // Handle direct requests to the base URL
//       {
//         source: '/:path*',
//         destination: 'http://143.244.132.118:8000/:path*',
//         has: [
//           {
//             type: 'header',
//             key: 'accept',
//             value: 'image/*',
//           },
//         ],
//       },
//     ];
//   },
// };

// export default nextConfig;




/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '72.61.169.69', // ADDED: Your VPS IP
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'iksgyangunjan.in', // ADDED: Your Domain
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'www.iksgyangunjan.in', // ADDED: Your WWW Domain
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
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

    if (isServer) {
      config.externals = [...config.externals, 'canvas'];
    }

    return config;
  },
  // OPTIONAL: Since Nginx handles proxying, you might not strictly need these rewrites
  // but if your code relies on them, here is the FIXED IP version.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // Point to Localhost (Internal)
      },
    ];
  },
};

export default nextConfig;