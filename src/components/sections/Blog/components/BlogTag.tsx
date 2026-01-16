"use client";

import { MouseEvent } from "react";

import { Tag } from "@/components/ui/Tag";
import { HOVER_OPACITY } from "@/constants";
import { Link, useRouter } from "@/i18n/routing";
import { getTagUrl } from "@/lib/urls";

import { getTagColor } from "../constants";

type TProps = {
  tag: string;
  size?: "sm" | "md";
  insideCard?: boolean;
};

export function BlogTag({ tag, size = "md", insideCard = false }: TProps) {
  const colorClass = getTagColor(tag);
  const router = useRouter();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(getTagUrl(tag));
  };

  if (insideCard) {
    return (
      <span
        role="link"
        onClick={handleClick}
        className={`relative z-10 ${HOVER_OPACITY}`}
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
