import { ArrowLeft } from "lucide-react";

import { Link } from "@/i18n/routing";

type TProps = {
  href: "/blog" | "/projects" | "/";
  children: string;
};

export function BackLink({ href, children }: TProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:opacity-70 transition-opacity cursor-pointer mb-8"
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </Link>
  );
}
