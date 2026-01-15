import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";

import { mdxComponents } from "@/components/sections/Blog";
import { extractHeadings, getAdjacentPosts, getAllPosts, getPostBySlug } from "@/lib/blog";

import { BlogPostLayout } from "./BlogPostLayout";


type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark",
    light: "github-light",
  },
  keepBackground: false,
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content, ...postMeta } = post;
  const headings = extractHeadings(content);
  const adjacentPosts = getAdjacentPosts(slug);

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
