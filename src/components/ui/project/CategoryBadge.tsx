import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/constants/categories";
import { cn } from "@/lib/utils";
import { TProjectCategory } from "@/types";

type TCategoryBadgeProps = {
  category: TProjectCategory;
  size?: "sm" | "md";
};

export function CategoryBadge({ category, size = "md" }: TCategoryBadgeProps) {
  return (
    <span
      className={cn(
        "text-xs rounded",
        size === "sm" ? "px-1.5 py-0.5" : "px-2 py-0.5",
        CATEGORY_COLORS[category]
      )}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
