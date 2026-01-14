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
        <span
          key={tech}
          className={cn(
            "text-xs text-muted-foreground bg-muted rounded",
            size === "sm" ? "px-1.5 py-0.5" : "px-2 py-1"
          )}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
