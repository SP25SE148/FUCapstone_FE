import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['daihoc.fpt.edu.vn'],
  },
  eslint: {
    // ✅ Bỏ qua kiểm tra ESLint khi chạy `next build`
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
