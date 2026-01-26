import { ChevronRight } from "lucide-react";

import { HOVER_TEXT_COLOR, ICON_SIZE, TRANSITION } from "@/constants";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type TBreadcrumb = {
  label: string;
  href?: "/" | "/blog" | "/projects";
};

type TProps = {
  items: TBreadcrumb[];
};

export function Breadcrumbs({ items }: TProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight className={cn(ICON_SIZE.sm, "flex-shrink-0")} aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span className="truncate" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(HOVER_TEXT_COLOR, TRANSITION.normal, "cursor-pointer")}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
