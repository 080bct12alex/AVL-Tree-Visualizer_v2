import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'], // ← removed 'mdx'
  // other config options
};

export default nextConfig;
