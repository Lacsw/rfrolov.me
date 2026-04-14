import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TTagListProps<T> = {
  items: T[];
  limit?: number;
  wrap?: boolean;
  className?: string;
  renderItem: (item: T, index: number) => ReactNode;
};

export function TagList<T>({
  items,
  limit,
  wrap = false,
  className,
  renderItem,
}: TTagListProps<T>) {
  const visibleItems = limit ? items.slice(0, limit) : items;
  const hiddenCount = limit ? items.length - visibleItems.length : 0;

  return (
    <div className={cn("flex items-center gap-1.5", wrap && "flex-wrap", className)}>
      {visibleItems.map((item, index) => renderItem(item, index))}
      {hiddenCount > 0 && (
        <span
          aria-label={`${hiddenCount} more`}
          className="text-xs text-muted-foreground whitespace-nowrap"
        >
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
