import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  // Configure webpack to watch content directory (for webpack mode)
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**"],
      };
    }
    return config;
  },

  // Turbopack-specific configuration for watching content files
  turbopack: {
    rules: {
      // Watch MDX files in content directory
      "*.mdx": {
        loaders: [],
        as: "*.mdx",
      },
    },
  },

  // Disable HMR cache for server components to ensure fresh data
  experimental: {
    serverComponentsHmrCache: false,
  },
};

export default nextConfig;
