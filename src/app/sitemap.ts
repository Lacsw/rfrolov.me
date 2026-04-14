import { MetadataRoute } from "next";

import { SITE_LAST_MODIFIED, SITE_URL, STATIC_ROUTES } from "@/constants";
import { locales } from "@/i18n/config";
import { getAllPosts } from "@/lib/blog";
import { getAllProjectsWithContent } from "@/lib/projects";
import { getBooks } from "@/lib/readings";

export const dynamic = "force-static";

// Build an { en: url, de: url } map for any localized path so the sitemap
// can declare hreflang alternates — Google needs these to understand that
// /en/blog/foo and /de/blog/foo are the same page in different languages.
function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = locales.flatMap((locale) =>
    STATIC_ROUTES.map((route) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
      alternates: { languages: languageAlternates(route) },
    }))
  );

  const blogUrls = locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${SITE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: languageAlternates(`/blog/${post.slug}`) },
    }))
  );

  const projectUrls = locales.flatMap((locale) =>
    getAllProjectsWithContent(locale).map((project) => ({
      url: `${SITE_URL}/${locale}/projects/${project.id}`,
      lastModified: new Date(`${project.year}-12-31`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: languageAlternates(`/projects/${project.id}`) },
    }))
  );

  const readingUrls = locales.flatMap((locale) =>
    getBooks()
      .filter((book) => book.status === "finished")
      .map((book) => ({
        url: `${SITE_URL}/${locale}/readings/${book.slug}`,
        lastModified: SITE_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.5,
        alternates: { languages: languageAlternates(`/readings/${book.slug}`) },
      }))
  );

  return [...staticUrls, ...blogUrls, ...projectUrls, ...readingUrls];
}
