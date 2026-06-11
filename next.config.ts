import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/genelens',
  images: { unoptimized: true },
};

export default nextConfig;
