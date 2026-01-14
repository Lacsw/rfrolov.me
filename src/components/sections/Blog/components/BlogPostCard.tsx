"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

import { BlogTags } from "./BlogTags";
import { ReadingTime } from "./ReadingTime";

type TBlogPostCardProps = {
  post: TBlogPostMeta;
  index: number;
};

export function BlogPostCard({ post, index }: TBlogPostCardProps) {
  const formattedDate = formatDate(post.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex flex-col h-full rounded-lg border bg-background p-6 transition-all duration-300",
          "hover:shadow-sm hover:scale-[1.01] cursor-pointer",
          post.featured
            ? "border-muted-foreground/30 hover:border-muted-foreground/50"
            : "border-muted hover:border-muted-foreground/20"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{formattedDate}</span>
              <span>·</span>
              <ReadingTime minutes={post.readingTime} showLabel />
            </div>
            <h3 className="font-medium">{post.title}</h3>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-3 grow">
          {post.description}
        </p>

        <div className="mt-4">
          <BlogTags tags={post.tags} limit={3} wrap />
        </div>
      </Link>
    </motion.div>
  );
}
