"use client";

import { useSearchParams } from "next/navigation";

import { useScrollSpy } from "@/components/sections/Experience/hooks/useScrollSpy";

import { ScrollDots } from "./ScrollDots";
import { ScrollLabel } from "./ScrollLabel";
import { ScrollTrack } from "./ScrollTrack";

type TNavItem = {
  id: string;
  label: string;
};

type TProps = {
  items: TNavItem[];
};

export function ScrollIndicator({ items }: TProps) {
  const searchParams = useSearchParams();
  const variant = searchParams.get("scroll") ?? "dots";
  const sectionIds = items.map((item) => item.id);
  const { activeId, scrollProgress, hasScrolled } = useScrollSpy(sectionIds);

  if (variant === "none") return null;

  return (
    <>
      {variant === "dots" && (
        <ScrollDots items={items} activeId={activeId} hasScrolled={hasScrolled} />
      )}
      {variant === "track" && (
        <ScrollTrack scrollProgress={scrollProgress} hasScrolled={hasScrolled} />
      )}
      {variant === "label" && (
        <ScrollLabel items={items} activeId={activeId} hasScrolled={hasScrolled} />
      )}
    </>
  );
}
