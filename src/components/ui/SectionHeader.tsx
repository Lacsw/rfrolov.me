import Link from "next/link";

import { HOVER_OPACITY } from "@/constants";

type TSectionHeaderProps = {
  title: string;
  description?: string;
  link?: {
    href: string;
    label: string;
  };
  as?: "h1" | "h2" | "h3";
};

export function SectionHeader({
  title,
  description,
  link,
  as: Tag = "h2",
}: TSectionHeaderProps) {
  const titleClasses = Tag === "h1"
    ? "text-2xl font-semibold tracking-tight"
    : "text-lg font-semibold tracking-tight";

  return (
    <div className={link ? "flex items-center justify-between" : undefined}>
      <div>
        <Tag className={titleClasses}>{title}</Tag>
        {description && (
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        )}
      </div>
      {link && (
        <Link
          href={link.href}
          className={`text-sm text-muted-foreground ${HOVER_OPACITY}`}
        >
          {link.label}
        </Link>
      )}
    </div>
  );
}
