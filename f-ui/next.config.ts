// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "mir-s3-cdn-cf.behance.net",
//       },
//       {
//         protocol: "https",
//         hostname: "yt3.googleusercontent.com",
//       },
//       {
//         protocol: "https",
//         hostname: "i.ytimg.com",
//       }
//     ],
//   },

//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           {
//             key: "Content-Security-Policy",
//             value: `
//               default-src 'self';
//               connect-src 'self' ws://localhost:8080 http://localhost:8080;
//               img-src 'self' blob: data: https:;
//               script-src 'self' 'unsafe-eval' 'unsafe-inline';
//               style-src 'self' 'unsafe-inline';
//             `.replace(/\n/g, " "),
//           }
//         ]
//       }
//     ];
//   }
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "mir-s3-cdn-cf.behance.net" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ytimg.com" }
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              frame-src https://www.youtube.com https://www.youtube-nocookie.com;
              child-src https://www.youtube.com https://www.youtube-nocookie.com;
              connect-src 'self' ws://localhost:8080 http://localhost:8080;
              img-src 'self' blob: data: https:;
              script-src 'self' 'unsafe-eval' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
            `.replace(/\n/g, " "),
          }
        ],
      },
    ];
  },
};

export default nextConfig;
