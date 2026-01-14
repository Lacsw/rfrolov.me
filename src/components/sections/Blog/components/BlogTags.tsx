import { cn } from "@/lib/utils";

import { BlogTag } from "./BlogTag";

type TBlogTagsProps = {
  tags: string[];
  limit?: number;
  size?: "sm" | "md";
  wrap?: boolean;
};

export function BlogTags({
  tags,
  limit = 3,
  size = "md",
  wrap = false,
}: TBlogTagsProps) {
  return (
    <div className={cn("flex gap-1.5", wrap && "flex-wrap")}>
      {tags.slice(0, limit).map((tag) => (
        <BlogTag key={tag} tag={tag} size={size} />
      ))}
    </div>
  );
}
