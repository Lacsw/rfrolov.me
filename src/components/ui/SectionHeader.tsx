import Link from "next/link";

import { HOVER_OPACITY, TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";

type TSectionHeaderProps = {
  title: string;
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({ title, description, link, as: Tag = "h2" }: TSectionHeaderProps) {
  const titleClasses = cn(
    "font-semibold tracking-tight",
    Tag === "h1" ? TEXT_SIZE.title : TEXT_SIZE.heading
  );

  return (
    <div className={link ? "flex items-center justify-between" : undefined}>
      <div>
        <Tag className={titleClasses}>{title}</Tag>
        {description && (
          <p className={cn("text-muted-foreground mt-2", TEXT_SIZE.body)}>{description}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className={cn("text-muted-foreground", TEXT_SIZE.body, HOVER_OPACITY)}
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}
