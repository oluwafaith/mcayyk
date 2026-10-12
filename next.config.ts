import type { NextConfig } from "next";

/**
 * Set STATIC_EXPORT=true to produce a fully static `out/` folder
 * (for GitHub Pages or any static host). For a project page served from
 * https://<user>.github.io/<repo>, also set NEXT_PUBLIC_BASE_PATH=/<repo>.
 */
const isStaticExport = process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  cacheComponents: !isStaticExport,
  partialPrefetching: !isStaticExport,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // The image optimizer needs a server; static hosts serve originals.
    unoptimized: isStaticExport,
  },
  ...(isStaticExport ? { output: "export" as const, basePath, trailingSlash: true } : {}),
};

export default nextConfig;
