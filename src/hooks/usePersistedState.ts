"use client";

import { useCallback, useEffect, useState } from "react";

export function usePersistedState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(defaultValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);

      if (stored !== null) {
        setState(JSON.parse(stored));
      }
    } catch {
      // Ignore errors (SSR, localStorage unavailable, invalid JSON)
    }

    setIsHydrated(true);
  }, [key]);

  const setPersistedState = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const nextValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;

        try {
          localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore errors (quota exceeded, etc.)
        }

        return nextValue;
      });
    },
    [key]
  );

  // Return default value before hydration to avoid flash
  return [isHydrated ? state : defaultValue, setPersistedState];
}
