"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import {
  ARROW_HOVER,
  CARD_BASE,
  CARD_BORDER,
  CARD_HOVER,
  getStaggeredAnimation,
  ICON_SIZE,
} from "@/constants";
import { Link } from "@/i18n/routing";
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
    <motion.div {...getStaggeredAnimation(index)} className="h-full">
      <Link
        href={`/blog/${post.slug}` as "/blog"}
        className={cn(
          "group flex flex-col h-full cursor-pointer",
          CARD_BASE,
          CARD_HOVER,
          post.featured ? CARD_BORDER.featured : CARD_BORDER.default
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
          <ArrowUpRight
            className={cn(ICON_SIZE.sm, "shrink-0 text-muted-foreground", ARROW_HOVER.upRight)}
          />
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-3 grow">{post.description}</p>

        <div className="mt-4">
          <BlogTags tags={post.tags} limit={3} wrap insideCard />
        </div>
      </Link>
    </motion.div>
  );
}
