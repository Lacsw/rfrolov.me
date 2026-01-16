"use client";

import { Grid, List } from "lucide-react";

import { HOVER_TEXT_COLOR } from "@/constants";
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
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={getButtonClassName(view === "list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}

export type { TViewMode };
