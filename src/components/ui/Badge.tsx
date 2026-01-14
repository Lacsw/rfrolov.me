import { cn } from "@/lib/utils";

type TBadgeProps = {
  children: string;
  variant?: "default" | "muted";
};

export function Badge({ children, variant = "default" }: TBadgeProps) {
  return (
    <span
      className={cn(
        "text-xs px-2 py-0.5 rounded font-medium",
        variant === "default"
          ? "text-foreground bg-foreground/10"
          : "text-muted-foreground bg-muted"
      )}
    >
      {children}
    </span>
  );
}
