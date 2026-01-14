"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BlogPostCard } from "@/components/sections/Blog";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";
import { motion } from "framer-motion";

type TBlogPageClientProps = {
  posts: TBlogPostMeta[];
  tags: string[];
};

export function BlogPageClient({ posts, tags }: TBlogPageClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) =>
        post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      )
    : posts;

  return (
    <section className="min-h-[calc(100vh-4rem)] py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
              <p className="text-muted-foreground text-sm mt-2">
                Thoughts on development, design, and technology
              </p>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={cn(
                    "text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all",
                    selectedTag === null
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:opacity-70"
                  )}
                >
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={cn(
                      "text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all",
                      selectedTag === tag
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:opacity-70"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredPosts.map((post, index) => (
                <BlogPostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">
              No posts found.
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
