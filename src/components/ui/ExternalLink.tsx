import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: TExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("cursor-pointer", className)}
    >
      {children}
    </a>
  );
}
