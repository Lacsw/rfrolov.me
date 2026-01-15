import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { getTagColor } from "@/components/sections/Blog/constants";
import { Container } from "@/components/ui";
import { getAllPosts, getAllTags } from "@/lib/blog";
import { cn } from "@/lib/utils";

function getTagPostCount(tag: string, posts: ReturnType<typeof getAllPosts>) {
  return posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  ).length;
}

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();

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
              All Tags
            </h1>
            <p className="text-muted-foreground">
              Browse posts by topic
            </p>
          </header>

          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => {
              const count = getTagPostCount(tag, posts);

              return (
                <Link
                  key={tag}
                  href={`/blog/tags/${tag.toLowerCase()}`}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-2 rounded-lg hover:opacity-70 transition-opacity cursor-pointer",
                    getTagColor(tag)
                  )}
                >
                  <span>{tag}</span>
                  <span className="text-xs opacity-70">({count})</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
