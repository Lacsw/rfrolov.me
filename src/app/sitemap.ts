import { MetadataRoute } from "next";

import { SITE_LAST_MODIFIED, SITE_URL, STATIC_ROUTES } from "@/constants";
import { locales } from "@/i18n/config";
import { getAllPosts } from "@/lib/blog";
import { getAllProjectsWithContent } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Generate URLs for static pages in all locales
  const staticUrls = locales.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // Generate URLs for blog posts in all locales
  const blogUrls = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  // Generate URLs for project detail pages in all locales
  const projectUrls = locales.flatMap((locale) =>
    getAllProjectsWithContent(locale).map((project) => ({
      url: `${SITE_URL}/${locale}/projects/${project.id}`,
      lastModified: new Date(`${project.year}-12-31`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticUrls, ...blogUrls, ...projectUrls];
}
