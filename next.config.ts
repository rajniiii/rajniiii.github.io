import type { NextConfig } from "next";

// Static export: the site is served from the gh-pages branch of
// rajniiii.github.io (a user site), so basePath stays empty and
// trailingSlash keeps /work/<slug>/ resolvable as a directory index.
const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: __dirname,
  trailingSlash: true,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
