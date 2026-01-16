import { ArrowLeft } from "lucide-react";

import { HOVER_OPACITY } from "@/constants";
import { Link } from "@/i18n/routing";

type TProps = {
  href: "/blog" | "/projects" | "/";
  children: string;
};

export function BackLink({ href, children }: TProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-sm text-muted-foreground mb-8 ${HOVER_OPACITY}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </Link>
  );
}
