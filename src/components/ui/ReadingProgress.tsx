"use client";

import { useReadingProgress } from "@/hooks/useReadingProgress";

export function ReadingProgress() {
  const progress = useReadingProgress();

  return (
    <div className="fixed top-16 left-0 right-0 h-0.5 bg-muted z-40">
      <div
        className="h-full bg-foreground transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
