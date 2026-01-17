import { ImageResponse } from "next/og";

import { locales, TLocale } from "@/i18n/config";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export const runtime = "edge";

export const alt = "Blog post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({
      locale,
      slug,
    }))
  );
}

type TProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function Image({ params }: TProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale as TLocale);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#fafafa",
            fontFamily: "monospace",
          }}
        >
          <span style={{ fontSize: 48 }}>Post not found</span>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "monospace",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              color: "#a1a1aa",
              fontSize: 24,
            }}
          >
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: "#27272a",
                  padding: "8px 16px",
                  borderRadius: 8,
                }}
              >
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
              color: "#a1a1aa",
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
            color: "#71717a",
            fontSize: 24,
          }}
        >
          <span>rfrolov.me</span>
          <span>
            {post.date} · {post.readingTime} min read
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
