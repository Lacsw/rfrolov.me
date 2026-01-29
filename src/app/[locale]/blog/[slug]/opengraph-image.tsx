import { ImageResponse } from "next/og";

import { locales, TLocale } from "@/i18n/config";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import {
  createNotFoundOgImage,
  OG_COLORS,
  OG_SIZE,
  ogContentStyles,
  ogTagStyles,
} from "@/lib/og";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      locale,
      slug: post.slug,
    }))
  );
}

export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = "image/png";

type TProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function Image({ params }: TProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale as TLocale);

  if (!post) {
    return createNotFoundOgImage("Post not found");
  }

  return new ImageResponse(
    <div style={ogContentStyles}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            color: OG_COLORS.muted,
            fontSize: 24,
          }}
        >
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={ogTagStyles}>
              {tag}
            </span>
          ))}
        </div>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.2,
            marginTop: 24,
            maxWidth: "90%",
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            fontSize: 28,
            color: OG_COLORS.muted,
            marginTop: 16,
            maxWidth: "80%",
            lineHeight: 1.4,
          }}
        >
          {post.description}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: OG_COLORS.mutedForeground,
          fontSize: 24,
        }}
      >
        <span>rfrolov.me</span>
        <span>
          {post.date} · {post.readingTime} min read
        </span>
      </div>
    </div>,
    { ...size }
  );
}
