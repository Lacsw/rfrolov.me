import Link from "next/link";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { TBlogPostMeta } from "@/types";

type TPostNavigationProps = {
  previous: TBlogPostMeta | null;
  next: TBlogPostMeta | null;
};

type TNavLinkProps = {
  post: TBlogPostMeta;
  direction: "previous" | "next";
};

function NavLink({ post, direction }: TNavLinkProps) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col gap-2 p-4 rounded-lg border border-muted hover:border-muted-foreground/30 transition-colors cursor-pointer",
        isPrevious ? "items-start" : "items-end"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-1 text-xs text-muted-foreground",
          !isPrevious && "flex-row-reverse"
        )}
      >
        {isPrevious ? (
          <ArrowLeft className="size-3 group-hover:-translate-x-1 transition-transform" />
        ) : (
          <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
        )}
        {isPrevious ? "Previous" : "Next"}
      </span>
      <span
        className={cn(
          "text-sm font-medium text-foreground group-hover:opacity-70 transition-opacity line-clamp-2",
          !isPrevious && "text-right"
        )}
      >
        {post.title}
      </span>
    </Link>
  );
}

export function PostNavigation({ previous, next }: TPostNavigationProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="mt-12 pt-8 border-t border-muted">
      <div className="grid grid-cols-2 gap-4">
        <div>{previous && <NavLink post={previous} direction="previous" />}</div>
        <div>{next && <NavLink post={next} direction="next" />}</div>
      </div>
    </nav>
  );
}
