import { ReactNode } from "react";

import { EXTERNAL_LINK_PROPS } from "@/constants";
import { cn } from "@/lib/utils";

type TExternalLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function ExternalLink({ href, children, className }: TExternalLinkProps) {
  return (
    <a href={href} {...EXTERNAL_LINK_PROPS} className={cn("cursor-pointer", className)}>
      {children}
    </a>
  );
}
