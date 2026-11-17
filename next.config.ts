import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * `NEXT_PUBLIC_BASE_PATH` is the repository sub-path on a project Pages site
 * (e.g. "/rj" for https://atharvakun.github.io/rj). Leave it unset for a
 * custom domain or a user site (<user>.github.io).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    // No image server on static hosting; the placeholder photography is already
    // sized through the Unsplash URL parameters.
    unoptimized: true,
    remotePatterns: [
      // Temporary photography source. Replace with your own CDN / asset host.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
