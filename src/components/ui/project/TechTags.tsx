import { Tag, TagList } from "@/components/ui";

type TTechTagsProps = {
  technologies: string[];
  limit?: number;
  size?: "sm" | "md";
  className?: string;
};

export function TechTags({ technologies, limit, size = "md", className }: TTechTagsProps) {
  return (
    <TagList
      items={technologies}
      limit={limit}
      wrap
      className={className}
      renderItem={(tech) => (
        <Tag key={tech} size={size}>
          {tech}
        </Tag>
      )}
    />
  );
}
