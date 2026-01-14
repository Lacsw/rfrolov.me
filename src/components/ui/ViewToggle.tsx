"use client";

import { Grid, List } from "lucide-react";

import { cn } from "@/lib/utils";

type TViewMode = "grid" | "list";

type TViewToggleProps = {
  view: TViewMode;
  onViewChange: (view: TViewMode) => void;
};

export function ViewToggle({ view, onViewChange }: TViewToggleProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
      <button
        onClick={() => onViewChange("grid")}
        className={cn(
          "p-1.5 rounded transition-all cursor-pointer",
          view === "grid"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Grid view"
      >
        <Grid className="h-4 w-4" />
      </button>
      <button
        onClick={() => onViewChange("list")}
        className={cn(
          "p-1.5 rounded transition-all cursor-pointer",
          view === "list"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}

export type { TViewMode };
