import type { NextConfig } from "next";

// GitHub Pages serves plain files from a CDN, so the whole site is
// pre-rendered to static HTML at build time.
//
// A project page lives under https://<user>.github.io/<repo>, so every asset
// needs a path prefix. A user/org page (repo named <user>.github.io) is served
// from the domain root and needs none. The workflow derives the right value and
// passes it in via NEXT_PUBLIC_BASE_PATH, so nothing is hardcoded here.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",

  // Required: the built-in image optimizer needs a server.
  images: { unoptimized: true },

  // Emit `about/index.html` rather than `about.html` so paths resolve without
  // a server rewriting extensions.
  trailingSlash: true,

  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
