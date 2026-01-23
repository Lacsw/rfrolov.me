import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const basePath = isGitHubPages ? "/rfrolov.me" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: isGitHubPages ? "/rfrolov.me/" : "",
  images: {
    unoptimized: true,
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withNextIntl(nextConfig);
