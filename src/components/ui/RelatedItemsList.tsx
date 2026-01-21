"use client";

import { memo, ReactNode } from "react";

import { ArrowRight } from "lucide-react";

import { ARROW_HOVER, ICON_SIZE, TEXT_SIZE } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type TRelatedItem = {
  title: string;
  description: string;
};

type TRelatedItemsListProps<T extends TRelatedItem> = {
  items: T[];
  title: string;
  getKey: (item: T) => string;
  getHref: (item: T) => string;
  renderTags?: (item: T) => ReactNode;
};

function RelatedItemsListInner<T extends TRelatedItem>({
  items,
  title,
  getKey,
  getHref,
  renderTags,
}: TRelatedItemsListProps<T>) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-muted">
      <h2 className={cn(TEXT_SIZE.heading, "font-semibold tracking-tight mb-6")}>{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={getKey(item)}
            href={getHref(item) as "/blog"}
            className={cn(
              "group flex items-center justify-between gap-4 p-4 -mx-4 rounded-lg",
              "hover:bg-muted/50 transition-colors cursor-pointer"
            )}
          >
            <div className="space-y-1 min-w-0">
              <h3 className="font-medium group-hover:text-foreground/80 transition-colors truncate">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
              {renderTags?.(item)}
            </div>
            <ArrowRight
              className={cn(ICON_SIZE.sm, "shrink-0 text-muted-foreground", ARROW_HOVER.right)}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export const RelatedItemsList = memo(RelatedItemsListInner) as typeof RelatedItemsListInner;
