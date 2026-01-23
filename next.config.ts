import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/rfrolov.me" : "",
  assetPrefix: isGitHubPages ? "/rfrolov.me/" : "",
};

export default withNextIntl(nextConfig);
