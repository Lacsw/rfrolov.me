import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-muted bg-background p-6",
        hover &&
          "transition-all duration-300 hover:border-muted-foreground/20 hover:shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
