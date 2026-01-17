import { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { getAllPosts } from "@/lib/blog";

const BASE_URL = "https://rfrolov.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/blog", "/projects"];

  // Generate URLs for static pages in all locales
  const staticUrls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.8,
    }))
  );

  // Generate URLs for blog posts in all locales
  const blogUrls = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticUrls, ...blogUrls];
}
