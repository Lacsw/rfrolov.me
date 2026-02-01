"use client";

import { Tag } from "@/components/ui/Tag";
import { HOVER_OPACITY } from "@/constants";
import { Link, useRouter } from "@/i18n/routing";
import { getTagUrl } from "@/lib/urls";
import { cn } from "@/lib/utils";

import { getTagColor } from "../../constants";

type TProps = {
  tag: string;
  size?: "sm" | "md";
  insideCard?: boolean;
};

export function BlogTag({ tag, size = "md", insideCard = false }: TProps) {
  const router = useRouter();
  const colorClass = getTagColor(tag);

  if (insideCard) {
    return (
      <span
        role="link"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(getTagUrl(tag) as "/blog");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            router.push(getTagUrl(tag) as "/blog");
          }
        }}
        className={cn("relative z-10 cursor-pointer", HOVER_OPACITY)}
      >
        <Tag size={size} variant="colored" colorClass={colorClass}>
          {tag}
        </Tag>
      </span>
    );
  }

  return (
    <Link href={getTagUrl(tag) as "/blog"} className={HOVER_OPACITY}>
      <Tag size={size} variant="colored" colorClass={colorClass}>
        {tag}
      </Tag>
    </Link>
  );
}
