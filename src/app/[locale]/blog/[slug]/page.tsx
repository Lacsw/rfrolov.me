import { notFound } from "next/navigation";

import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "@/components/sections/Blog";
import { JsonLd } from "@/components/seo";
import { locales, TLocale } from "@/i18n/config";
import {
  extractHeadings,
  getAdjacentPosts,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
  getSeriesInfo,
  TSeriesInfo,
} from "@/lib/blog";
import { generateBlogPostSchema } from "@/lib/jsonld";

import { BlogPostLayout } from "./BlogPostLayout";

type TProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({
      locale,
      slug,
    }))
  );
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
  defaultLang: "plaintext",
};

export default async function BlogPostPage({ params }: TProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as TLocale;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { content, ...postMeta } = post;
  const headings = extractHeadings(content);
  const adjacentPosts = getAdjacentPosts(slug, locale);
  const relatedPosts = getRelatedPosts(slug, post.tags, locale);
  const seriesInfo: TSeriesInfo | null = post.series
    ? getSeriesInfo(slug, post.series.name, locale)
    : null;

  return (
    <main className="pt-16">
      <JsonLd data={generateBlogPostSchema(postMeta, locale)} />
      <BlogPostLayout
        post={postMeta}
        headings={headings}
        adjacentPosts={adjacentPosts}
        relatedPosts={relatedPosts}
        seriesInfo={seriesInfo}
      >
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]],
            },
          }}
        />
      </BlogPostLayout>
    </main>
  );
}
