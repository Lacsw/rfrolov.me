import { Tag } from "@/components/ui/Tag";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/constants";
import { TProjectCategory } from "@/types";

type TCategoryWithYearProps = {
  category: TProjectCategory;
  year: number;
  size?: "sm" | "md";
};

export function CategoryWithYear({ category, year, size = "md" }: TCategoryWithYearProps) {
  return (
    <div className="flex items-center gap-2">
      <Tag size={size} variant="colored" colorClass={CATEGORY_COLORS[category]}>
        {CATEGORY_LABELS[category]}
      </Tag>
      <span className="text-xs text-muted-foreground">{year}</span>
    </div>
  );
}
