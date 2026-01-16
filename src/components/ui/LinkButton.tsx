import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ExternalLink } from "./ExternalLink";

type TLinkButtonProps = {
  href: string;
  variant?: "solid" | "outline";
  children: ReactNode;
  className?: string;
};

export function LinkButton({
  href,
  variant = "solid",
  children,
  className,
}: TLinkButtonProps) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity cursor-pointer",
        variant === "solid"
          ? "bg-foreground text-background"
          : "border border-muted-foreground/30 text-foreground",
        className
      )}
    >
      {children}
    </ExternalLink>
  );
}
