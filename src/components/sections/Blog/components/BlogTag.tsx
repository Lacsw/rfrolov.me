import { cn } from "@/lib/utils";

import { getTagColor } from "../constants";

type TBlogTagProps = {
  tag: string;
  size?: "sm" | "md";
};

export function BlogTag({ tag, size = "md" }: TBlogTagProps) {
  return (
    <span
      className={cn(
        "text-xs py-0.5 rounded",
        size === "sm" ? "px-1.5" : "px-2",
        getTagColor(tag)
      )}
    >
      {tag}
    </span>
  );
}
