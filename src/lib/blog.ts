import path from "path";

import readingTime from "reading-time";

import { CONTENT_PATHS, IS_PRODUCTION } from "@/constants";
import { TLocale } from "@/i18n/config";
import { TBlogPost, TBlogPostMeta, TBlogPostSeries, THeading } from "@/types";

import { getMDXFiles, parseMDXFile } from "./content";
import { slugify } from "./utils";

const BLOG_DIR = CONTENT_PATHS.blog;

// Filename format: 001_slug-name.en.mdx
const FILENAME_REGEX = /^(\d+)_(.+)\.(en|de)\.mdx$/;

type TBlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  draft?: boolean;
  series?: { name: string; order: number };
};

type TParsedFilename = {
  order: number;
  slug: string;
  locale: TLocale;
};

function parseFilename(filename: string): TParsedFilename | null {
  const match = filename.match(FILENAME_REGEX);

  if (!match) {
    return null;
  }

  return {
    order: parseInt(match[1], 10),
    slug: match[2],
    locale: match[3] as TLocale,
  };
}

type TGetAllPostsOptions = {
  includeDrafts?: boolean;
};

export function getAllPosts(
  locale: TLocale,
  options: TGetAllPostsOptions = {}
): TBlogPostMeta[] {
  const { includeDrafts = false } = options;
  const files = getMDXFiles(BLOG_DIR);

  const posts = files
    .map((file) => {
      const parsed = parseFilename(file);

      if (!parsed || parsed.locale !== locale) {
        return null;
      }

      const filePath = path.join(BLOG_DIR, file);
      const { data: rawData, content } = parseMDXFile(filePath);
      const data = rawData as TBlogFrontmatter;

      const isDraft = data.draft || false;

      // Hide drafts in production (unless explicitly requested)
      if (IS_PRODUCTION && isDraft && !includeDrafts) {
        return null;
      }

      const series: TBlogPostSeries | undefined = data.series
        ? { name: data.series.name, order: data.series.order }
        : undefined;

      return {
        slug: parsed.slug,
        order: parsed.order,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        featured: data.featured || false,
        draft: isDraft,
        series,
        readingTime: Math.ceil(readingTime(content).minutes),
      } as TBlogPostMeta;
    })
    .filter((post): post is TBlogPostMeta => post !== null)
    .sort((a, b) => b.order - a.order);

  return posts;
}

// For generateStaticParams - always include all posts including drafts
export function getAllPostSlugs(locale: TLocale): string[] {
  return getAllPosts(locale, { includeDrafts: true }).map((post) => post.slug);
}

function findPostFile(slug: string, locale: TLocale): string | null {
  const files = getMDXFiles(BLOG_DIR);
  const matchingFile = files.find((file) => {
    const parsed = parseFilename(file);

    return parsed?.slug === slug && parsed?.locale === locale;
  });

  return matchingFile ? path.join(BLOG_DIR, matchingFile) : null;
}

export function getPostBySlug(slug: string, locale: TLocale): TBlogPost | null {
  const filePath = findPostFile(slug, locale);

  if (!filePath) {
    return null;
  }

  const { data: rawData, content } = parseMDXFile(filePath);
  const data = rawData as TBlogFrontmatter;
  const parsed = parseFilename(path.basename(filePath));
  const isDraft = data.draft || false;

  // Hide drafts in production
  if (IS_PRODUCTION && isDraft) {
    return null;
  }

  const series: TBlogPostSeries | undefined = data.series
    ? { name: data.series.name, order: data.series.order }
    : undefined;

  return {
    slug,
    order: parsed?.order ?? 0,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    featured: data.featured || false,
    draft: isDraft,
    series,
    readingTime: Math.ceil(readingTime(content).minutes),
    content,
  };
}

export function getFeaturedPosts(locale: TLocale, limit = 3): TBlogPostMeta[] {
  const posts = getAllPosts(locale);
  const featured = posts.filter((post) => post.featured);

  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }

  const remaining = posts.filter((post) => !post.featured);

  return [...featured, ...remaining].slice(0, limit);
}

export function getAllTags(locale: TLocale): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export type TTagWithCount = {
  tag: string;
  count: number;
};

export function getTagsWithCounts(locale: TLocale): TTagWithCount[] {
  const posts = getAllPosts(locale);
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string, locale: TLocale): TBlogPostMeta[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export type TAdjacentPosts = {
  previous: TBlogPostMeta | null;
  next: TBlogPostMeta | null;
};

export function getAdjacentPosts(slug: string, locale: TLocale): TAdjacentPosts {
  const posts = getAllPosts(locale);
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  // Posts are sorted by order descending (newest first: 3, 2, 1)
  // Previous = older post (later in list, higher index)
  // Next = newer post (earlier in list, lower index)
  return {
    previous: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

export type TSeriesInfo = {
  name: string;
  posts: TBlogPostMeta[];
  currentIndex: number;
};

export function getSeriesInfo(
  currentSlug: string,
  seriesName: string,
  locale: TLocale
): TSeriesInfo | null {
  const posts = getAllPosts(locale);

  const seriesPosts = posts
    .filter((post) => post.series?.name === seriesName)
    .sort((a, b) => (a.series?.order ?? 0) - (b.series?.order ?? 0));

  if (seriesPosts.length === 0) {
    return null;
  }

  const currentIndex = seriesPosts.findIndex((post) => post.slug === currentSlug);

  return {
    name: seriesName,
    posts: seriesPosts,
    currentIndex,
  };
}

export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  locale: TLocale,
  limit = 3
): TBlogPostMeta[] {
  const posts = getAllPosts(locale);

  // Calculate relevance score based on shared tags
  const scoredPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) =>
        tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
      );

      return {
        post,
        score: sharedTags.length,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(({ post }) => post);
}

export function extractHeadings(content: string): THeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: THeading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugify(text);

    headings.push({ id, text, level });
  }

  return headings;
}
