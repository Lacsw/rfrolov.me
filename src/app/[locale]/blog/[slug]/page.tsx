import { notFound } from "next/navigation";

import { getLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "@/components/sections/Blog";
import { locales, TLocale } from "@/i18n/config";
import { extractHeadings, getAdjacentPosts, getAllPostSlugs, getPostBySlug } from "@/lib/blog";

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

  return (
    <main className="pt-16">
      <BlogPostLayout post={postMeta} headings={headings} adjacentPosts={adjacentPosts}>
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
