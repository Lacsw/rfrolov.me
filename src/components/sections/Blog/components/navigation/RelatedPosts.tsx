"use client";

import { memo } from "react";

import { ArrowRight } from "lucide-react";

import { ARROW_HOVER, ICON_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

import { BlogTags } from "../post";

type TRelatedPostsProps = {
  posts: TBlogPostMeta[];
  title?: string;
};

export const RelatedPosts = memo(function RelatedPosts({
  posts,
  title = "Related Posts",
}: TRelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-muted">
      <h2 className="text-lg font-semibold tracking-tight mb-6">{title}</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}` as "/blog"}
            className={cn(
              "group flex items-center justify-between gap-4 p-4 -mx-4 rounded-lg",
              "hover:bg-muted/50 transition-colors cursor-pointer"
            )}
          >
            <div className="space-y-1 min-w-0">
              <h3 className="font-medium group-hover:text-foreground/80 transition-colors truncate">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{post.description}</p>
              <BlogTags tags={post.tags} limit={2} size="sm" insideCard />
            </div>
            <ArrowRight
              className={cn(ICON_SIZE.sm, "shrink-0 text-muted-foreground", ARROW_HOVER.right)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
});
