import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/fab.tf',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;