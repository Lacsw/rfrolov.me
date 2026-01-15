import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { BlogPostListItem } from "@/components/sections/Blog";
import { Container } from "@/components/ui";
import { getAllTags, getPostsByTag } from "@/lib/blog";

type TProps = {
  params: Promise<{ tag: string }>;
};

export async function generateStaticParams() {
  const tags = getAllTags();

  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export default async function TagPage({ params }: TProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="pt-16">
      <section className="py-12 lg:py-16">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:opacity-70 transition-opacity cursor-pointer mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">
              Posts tagged with &ldquo;{tag}&rdquo;
            </h1>
            <p className="text-muted-foreground">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
            </p>
          </header>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <BlogPostListItem key={post.slug} post={post} index={index} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
