import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = nextPWA({
  dest: "public", // output service worker to /public
  register: true, // auto register service worker
  skipWaiting: true, // activate SW immediately
  disable: process.env.NODE_ENV === "development", // disable PWA in dev
});

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA(nextConfig);
