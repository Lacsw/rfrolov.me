import { Link } from "@/i18n/routing";
import { getTagUrl } from "@/lib/urls";
import { cn } from "@/lib/utils";

import { getTagColor } from "../constants";

type TProps = {
  tag: string;
  size?: "sm" | "md";
  clickable?: boolean;
};

export function BlogTag({ tag, size = "md", clickable = true }: TProps) {
  const className = cn(
    "text-xs py-0.5 rounded",
    size === "sm" ? "px-1.5" : "px-2",
    getTagColor(tag),
    clickable && "hover:opacity-70 transition-opacity cursor-pointer"
  );

  if (clickable) {
    return (
      <Link href={getTagUrl(tag) as "/blog"} className={className}>
        {tag}
      </Link>
    );
  }

  return <span className={className}>{tag}</span>;
}
