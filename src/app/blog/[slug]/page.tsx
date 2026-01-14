import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BlogPostLayout } from "./BlogPostLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/sections/Blog";
import rehypePrettyCode from "rehype-pretty-code";

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
  theme: "github-dark",
  keepBackground: true,
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { content, ...postMeta } = post;

  return (
    <main className="pt-16">
      <BlogPostLayout post={postMeta}>
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
            },
          }}
        />
      </BlogPostLayout>
    </main>
  );
}
