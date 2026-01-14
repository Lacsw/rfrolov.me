"use client";

import { Container } from "@/components/ui/Container";
import { TBlogPostMeta } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPostCard } from "./components";

type BlogListProps = {
  posts: TBlogPostMeta[];
};

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Latest Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:opacity-70 transition-opacity cursor-pointer"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
