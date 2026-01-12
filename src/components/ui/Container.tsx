import { cn } from "@/lib/utils";

type TContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: TContainerProps) {
  return (
    <div className={cn("mx-auto max-w-5xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
