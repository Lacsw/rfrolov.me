"use client";

import { Container } from "@/components/ui";
import { getTagColor } from "@/components/sections/Blog/constants";
import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type TBlogPostLayoutProps = {
  post: TBlogPostMeta;
  children: ReactNode;
};

export function BlogPostLayout({ post, children }: TBlogPostLayoutProps) {
  const formattedDate = formatDate(post.date, { month: "long" });

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:opacity-70 transition-opacity cursor-pointer mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <header className="mb-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground">{post.description}</p>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={cn("text-xs px-2 py-1 rounded", getTagColor(tag))}
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <hr className="border-muted mb-8" />

          <div className="prose-custom">{children}</div>
        </motion.article>
      </Container>
    </section>
  );
}
