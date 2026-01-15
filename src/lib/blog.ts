import fs from "fs";
import path from "path";

import matter from "gray-matter";
import readingTime from "reading-time";

import { TLocale } from "@/i18n/config";
import { TBlogPost, TBlogPostMeta, THeading } from "@/types";

function getBlogDir(locale: TLocale) {
  return path.join(process.cwd(), "src/content/blog", locale);
}

export function getAllPosts(locale: TLocale): TBlogPostMeta[] {
  const blogDir = getBlogDir(locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        featured: data.featured || false,
        readingTime: Math.ceil(readingTime(content).minutes),
      } as TBlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string, locale: TLocale): TBlogPost | null {
  const filePath = path.join(getBlogDir(locale), `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    featured: data.featured || false,
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

  return {
    previous: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
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
