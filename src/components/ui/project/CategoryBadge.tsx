import { Tag } from "@/components/ui/Tag";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/constants";
import { TProjectCategory } from "@/types";

type TCategoryBadgeProps = {
  category: TProjectCategory;
  size?: "sm" | "md";
};

export function CategoryBadge({ category, size = "md" }: TCategoryBadgeProps) {
  return (
    <Tag size={size} variant="colored" colorClass={CATEGORY_COLORS[category]}>
      {CATEGORY_LABELS[category]}
    </Tag>
  );
}
