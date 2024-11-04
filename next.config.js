/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dntz4i2wq/image/upload/**",
      },
    ],
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;
