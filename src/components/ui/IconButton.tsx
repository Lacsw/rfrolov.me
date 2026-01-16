import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

import { HOVER_TEXT_COLOR } from "@/constants";
import { cn } from "@/lib/utils";

type TIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  active?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(
  ({ children, className, active, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "p-2 rounded-md transition-colors cursor-pointer",
          active ? "text-foreground bg-muted/50" : HOVER_TEXT_COLOR,
          !active && "hover:bg-muted/50",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
