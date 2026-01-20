import { FileX, Search } from "lucide-react";

import { cn } from "@/lib/utils";

type TEmptyStateProps = {
  title: string;
  description?: string;
  variant?: "search" | "filter";
  className?: string;
};

export function EmptyState({
  title,
  description,
  variant = "filter",
  className,
}: TEmptyStateProps) {
  const Icon = variant === "search" ? Search : FileX;

  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
