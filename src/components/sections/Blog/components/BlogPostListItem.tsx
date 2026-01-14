"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { formatDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

import { BlogTags } from "./BlogTags";
import { ReadingTime } from "./ReadingTime";

type TBlogPostListItemProps = {
  post: TBlogPostMeta;
  index: number;
};

export function BlogPostListItem({ post, index }: TBlogPostListItemProps) {
  const formattedDate = formatDate(post.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "group flex items-center justify-between gap-4 py-4 border-b border-muted transition-colors",
          "hover:bg-muted/30 -mx-4 px-4 cursor-pointer"
        )}
      >
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="font-medium truncate group-hover:text-foreground/80 transition-colors">
              {post.title}
            </h3>
            <BlogTags tags={post.tags} limit={2} size="sm" />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {post.description}
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <ReadingTime minutes={post.readingTime} />
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
