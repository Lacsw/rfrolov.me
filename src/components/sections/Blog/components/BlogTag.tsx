import { Tag } from "@/components/ui/Tag";
import { Link } from "@/i18n/routing";
import { getTagUrl } from "@/lib/urls";

import { getTagColor } from "../constants";

type TProps = {
  tag: string;
  size?: "sm" | "md";
  clickable?: boolean;
};

export function BlogTag({ tag, size = "md", clickable = true }: TProps) {
  const colorClass = getTagColor(tag);

  if (clickable) {
    return (
      <Link
        href={getTagUrl(tag) as "/blog"}
        className="hover:opacity-70 transition-opacity cursor-pointer"
      >
        <Tag size={size} variant="colored" colorClass={colorClass}>
          {tag}
        </Tag>
      </Link>
    );
  }

  return (
    <Tag size={size} variant="colored" colorClass={colorClass}>
      {tag}
    </Tag>
  );
}
