/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "194.163.155.58",
        port: "8092",
      },
    ],
    domains: ["staging.fawaterk.com"],
  },
};

export default nextConfig;
