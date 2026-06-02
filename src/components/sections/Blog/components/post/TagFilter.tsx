"use client";

import { ReactNode, useMemo, useState } from "react";

import { useMediaQuery, useRowOverflow } from "@/hooks";
import { cn } from "@/lib/utils";

type TLabels = {
  all: string;
  showLess: string;
  showMoreAria: (count: number) => string;
  showLessAria: string;
};

type TProps = {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
  isTactile: boolean;
  labels: TLabels;
};

const tagChipClass = (active: boolean) =>
  cn(
    "shrink-0 whitespace-nowrap text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all",
    active ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:opacity-70"
  );

// "+N" / "Show less" read as actions, so they get an outlined treatment that's
// visually distinct from the filled/muted tag chips.
const actionChipClass =
  "shrink-0 whitespace-nowrap text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all border border-muted-foreground/30 text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground";

type TChipProps = {
  children: ReactNode;
  tactile: boolean;
  action?: boolean;
  active?: boolean;
  onClick?: () => void;
  ariaPressed?: boolean;
  ariaExpanded?: boolean;
  ariaLabel?: string;
  tabIndex?: number;
};

function Chip({
  children,
  tactile,
  action = false,
  active = false,
  onClick,
  ariaPressed,
  ariaExpanded,
  ariaLabel,
  tabIndex,
}: TChipProps) {
  const shared = {
    onClick,
    "aria-pressed": ariaPressed,
    "aria-expanded": ariaExpanded,
    "aria-label": ariaLabel,
    tabIndex,
  };

  if (tactile) {
    return (
      <button {...shared} className="tactile-surface tactile-surface--ghost tactile-surface--sm shrink-0">
        <span>{children}</span>
      </button>
    );
  }

  return (
    <button {...shared} className={action ? actionChipClass : tagChipClass(active)}>
      {children}
    </button>
  );
}

export function TagFilter({ tags, selectedTag, onSelect, isTactile, labels }: TProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [expanded, setExpanded] = useState(false);

  // Pin the selected tag right after "All" so the active filter stays visible
  // even when the rest of the row is collapsed behind "+N".
  const orderedTags = useMemo(() => {
    if (!selectedTag) return tags;

    return [selectedTag, ...tags.filter((tag) => tag !== selectedTag)];
  }, [tags, selectedTag]);

  const collapsible = isDesktop && !expanded;

  // Chips measured = "All" + every tag.
  const { containerRef, measureRef, visibleCount } = useRowOverflow({
    itemCount: orderedTags.length + 1,
    enabled: collapsible,
  });

  const visibleTagCount = collapsible ? Math.max(visibleCount - 1, 0) : orderedTags.length;
  const hiddenCount = orderedTags.length - visibleTagCount;
  const showOverflow = collapsible && hiddenCount > 0;

  const allChip = (interactive: boolean) => (
    <Chip
      tactile={isTactile}
      active={selectedTag === null}
      ariaPressed={interactive ? selectedTag === null : undefined}
      onClick={interactive ? () => onSelect(null) : undefined}
      tabIndex={interactive ? undefined : -1}
    >
      {labels.all}
    </Chip>
  );

  const tagChip = (tag: string, interactive: boolean) => (
    <Chip
      key={tag}
      tactile={isTactile}
      active={selectedTag === tag}
      ariaPressed={interactive ? selectedTag === tag : undefined}
      onClick={interactive ? () => onSelect(tag) : undefined}
      tabIndex={interactive ? undefined : -1}
    >
      {tag}
    </Chip>
  );

  // Mobile: keep the edge-to-edge horizontal-scroll row, no overflow chip.
  if (!isDesktop) {
    return (
      <div
        className={cn(
          "-mx-6 flex items-center gap-2 overflow-x-auto px-6",
          "[&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
        )}
      >
        {allChip(true)}
        {tags.map((tag) => tagChip(tag, true))}
      </div>
    );
  }

  // Desktop: single-line collapse with inline expand.
  const displayedTags = expanded ? orderedTags : orderedTags.slice(0, visibleTagCount);

  return (
    <div className="relative">
      {/* Off-screen mirror: all chips + a "+N" sample, used only for measurement. */}
      <div
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute -z-10 flex h-0 flex-nowrap items-center gap-2 overflow-hidden opacity-0"
      >
        {allChip(false)}
        {orderedTags.map((tag) => tagChip(tag, false))}
        <Chip tactile={isTactile} action tabIndex={-1}>
          +{orderedTags.length}
        </Chip>
      </div>

      <div ref={containerRef} className={cn("flex items-center gap-2", expanded && "flex-wrap")}>
        {allChip(true)}
        {displayedTags.map((tag) => tagChip(tag, true))}

        {showOverflow && (
          <Chip
            tactile={isTactile}
            action
            ariaExpanded={false}
            ariaLabel={labels.showMoreAria(hiddenCount)}
            onClick={() => setExpanded(true)}
          >
            +{hiddenCount}
          </Chip>
        )}

        {expanded && (
          <Chip
            tactile={isTactile}
            action
            ariaExpanded
            ariaLabel={labels.showLessAria}
            onClick={() => setExpanded(false)}
          >
            {labels.showLess}
          </Chip>
        )}
      </div>
    </div>
  );
}
