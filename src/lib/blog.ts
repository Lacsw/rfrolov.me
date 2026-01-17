import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { TLocale } from "@/i18n/config";
import { TBlogPost, TBlogPostMeta, THeading } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const IS_PRODUCTION = process.env.NODE_ENV === "production";

// Filename format: 001_slug-name.en.mdx
const FILENAME_REGEX = /^(\d+)_(.+)\.(en|de)\.mdx$/;

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

  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const parsed = parseFilename(file);

      if (!parsed || parsed.locale !== locale) {
        return null;
      }

      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      const isDraft = data.draft || false;

      // Hide drafts in production (unless explicitly requested)
      if (IS_PRODUCTION && isDraft && !includeDrafts) {
        return null;
      }

      return {
        slug: parsed.slug,
        order: parsed.order,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        featured: data.featured || false,
        draft: isDraft,
        readingTime: Math.ceil(readingTime(content).minutes),
      } as TBlogPostMeta;
    })
    .filter((post): post is TBlogPostMeta => post !== null)
    .sort((a, b) => a.order - b.order);

  return posts;
}

// For generateStaticParams - always include all posts including drafts
export function getAllPostSlugs(locale: TLocale): string[] {
  return getAllPosts(locale, { includeDrafts: true }).map((post) => post.slug);
}

function findPostFile(slug: string, locale: TLocale): string | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null;
  }

  const files = fs.readdirSync(BLOG_DIR);
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

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const parsed = parseFilename(path.basename(filePath));
  const isDraft = data.draft || false;

  // Hide drafts in production
  if (IS_PRODUCTION && isDraft) {
    return null;
  }

  return {
    slug,
    order: parsed?.order ?? 0,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    featured: data.featured || false,
    draft: isDraft,
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

  // Posts are sorted by order ascending (1, 2, 3...)
  // Previous = lower order (earlier in list)
  // Next = higher order (later in list)
  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
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
