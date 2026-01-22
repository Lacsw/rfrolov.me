import { useEffect, useRef, useState } from "react";

/**
 * Returns true when the page has been scrolled past the threshold.
 * Uses requestAnimationFrame throttling for smooth performance.
 * @param threshold - Scroll position in pixels to trigger (default: 50)
 */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [threshold]);

  return scrolled;
}
