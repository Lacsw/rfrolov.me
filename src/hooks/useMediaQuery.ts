"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * SSR-safe media query hook. Returns `false` on the server and during the
 * first client render (so it never causes a hydration mismatch), then the real
 * match — applied in a layout effect so the correction lands before the browser
 * paints, avoiding a visible flash when the layout differs across breakpoints.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
