"use client";

import { Grid, List } from "lucide-react";

import { HOVER_TEXT_COLOR, ICON_SIZE } from "@/constants";
import { cn } from "@/lib/utils";

type TViewMode = "grid" | "list";

type TViewToggleProps = {
  view: TViewMode;
  onViewChange: (view: TViewMode) => void;
};

export function ViewToggle({ view, onViewChange }: TViewToggleProps) {
  const getButtonClassName = (isActive: boolean) =>
    cn(
      "p-1.5 rounded transition-all cursor-pointer",
      isActive ? "bg-background text-foreground shadow-sm" : HOVER_TEXT_COLOR
    );

  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
      <button
        onClick={() => onViewChange("grid")}
        className={getButtonClassName(view === "grid")}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
      >
        <Grid className={ICON_SIZE.sm} />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={getButtonClassName(view === "list")}
        aria-label="List view"
        aria-pressed={view === "list"}
      >
        <List className={ICON_SIZE.sm} />
      </button>
    </div>
  );
}

export type { TViewMode };
