/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.etsystatic.com",
      },
    ],
  },
};

export default pwaConfig(nextConfig);
