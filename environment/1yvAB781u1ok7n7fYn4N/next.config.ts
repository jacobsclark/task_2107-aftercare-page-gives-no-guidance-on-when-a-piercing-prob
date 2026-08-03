import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const nextConfig: NextConfig = {
  // Pin the project root to this directory. Without it, Turbopack infers the
  // root by walking up to the nearest lockfile, which breaks routing and
  // file resolution whenever this app sits inside a larger repo.
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
