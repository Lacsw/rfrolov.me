import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";

type TTechTagsProps = {
  technologies: string[];
  limit?: number;
  size?: "sm" | "md";
  className?: string;
};

export function TechTags({ technologies, limit, size = "md", className }: TTechTagsProps) {
  const items = limit ? technologies.slice(0, limit) : technologies;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((tech) => (
        <Tag key={tech} size={size}>
          {tech}
        </Tag>
      ))}
    </div>
  );
}
