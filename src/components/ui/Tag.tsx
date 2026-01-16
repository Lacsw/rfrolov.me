import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TTagProps = {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "muted" | "colored";
  colorClass?: string;
  className?: string;
};

export function Tag({
  children,
  size = "md",
  variant = "muted",
  colorClass,
  className,
}: TTagProps) {
  return (
    <span
      className={cn(
        "text-xs rounded",
        size === "sm" ? "px-1.5 py-0.5" : "px-2 py-0.5",
        variant === "muted"
          ? "text-muted-foreground bg-muted"
          : colorClass || "text-muted-foreground bg-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
