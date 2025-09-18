import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Ignore TypeScript errors only when deployed on Vercel
    ignoreBuildErrors: isVercel,
  },
  // You can add other config here
};

export default nextConfig;
