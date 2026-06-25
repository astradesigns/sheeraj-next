import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  distDir: "dist",
  // Pin the workspace root — a stray lockfile in $HOME otherwise confuses inference.
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    // Filesystem cache panics on some pages (hospitality) in v16.2.x — disable for dev.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
