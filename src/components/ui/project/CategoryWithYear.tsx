import { TProjectCategory } from "@/types";

import { CategoryBadge } from "./CategoryBadge";

type TCategoryWithYearProps = {
  category: TProjectCategory;
  year: number;
  size?: "sm" | "md";
};

export function CategoryWithYear({ category, year, size = "md" }: TCategoryWithYearProps) {
  return (
    <div className="flex items-center gap-2">
      <CategoryBadge category={category} size={size} />
      <span className="text-xs text-muted-foreground">{year}</span>
    </div>
  );
}
