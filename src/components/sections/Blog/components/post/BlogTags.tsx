import { TagList } from "@/components/ui";

import { BlogTag } from "./BlogTag";

type TBlogTagsProps = {
  tags: string[];
  limit?: number;
  size?: "sm" | "md";
  wrap?: boolean;
  insideCard?: boolean;
};

export function BlogTags({
  tags,
  limit = 3,
  size = "md",
  wrap = false,
  insideCard = false,
}: TBlogTagsProps) {
  return (
    <TagList
      items={tags}
      limit={limit}
      wrap={wrap}
      renderItem={(tag) => (
        <BlogTag key={tag} tag={tag} size={size} insideCard={insideCard} />
      )}
    />
  );
}
