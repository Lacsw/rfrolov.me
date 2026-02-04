import { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "@/components/sections/Blog";
import { JsonLd } from "@/components/seo";
import { SITE_URL } from "@/constants";
import { isLocale, locales } from "@/i18n/config";
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
import { rehypePrettyCodeOptions } from "@/lib/mdx";

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

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { slug, locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const post = getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "metadata" });

  if (!post) {
    return {
      title: t("title"),
    };
  }

  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title: `${post.title} | Roman Frolov`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: locale === "de" ? "de_DE" : "en_US",
      publishedTime: post.date,
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/en/blog/${slug}`,
        de: `${SITE_URL}/de/blog/${slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: TProps) {
  const { slug, locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
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
