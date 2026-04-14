"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "rf-palette-recent";
const MAX_RECENT = 3;

function readFromStorage(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter((v): v is string => typeof v === "string").slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

/**
 * Persist the last `MAX_RECENT` executed command ids to localStorage.
 * Returns the ids in most-recently-used order and a function to record
 * a new execution.
 */
export function useRecentCommands() {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  // Hydrate on mount so server and first client render both yield [].
  useEffect(() => {
    setRecentIds(readFromStorage());
  }, []);

  const recordCommand = useCallback((id: string) => {
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((existing) => existing !== id)].slice(0, MAX_RECENT);

      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }

      return next;
    });
  }, []);

  return { recentIds, recordCommand };
}
