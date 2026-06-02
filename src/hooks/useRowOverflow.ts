"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type TOptions = {
  /** Total number of chips rendered into the measurement row. */
  itemCount: number;
  /** When false, no measurement happens and every item is reported visible. */
  enabled: boolean;
};

type TResult = {
  /** Attach to the visible (collapsed) row — its width is the budget. */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Attach to a hidden mirror row that renders ALL chips + a "+N" sample last. */
  measureRef: React.RefObject<HTMLDivElement | null>;
  /** How many leading chips fit on one row, leaving room for the "+N" chip. */
  visibleCount: number;
};

/**
 * Measures how many chips fit on a single row. The component renders an
 * off-screen mirror (all chips followed by a representative "+N" chip); this
 * hook reads their laid-out positions and returns how many leading chips fit
 * within the visible container, reserving space for the "+N" chip when the row
 * overflows. Recomputes on container resize and when the item count changes.
 */
export function useRowOverflow({ itemCount, enabled }: TOptions): TResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  useIsomorphicLayoutEffect(() => {
    if (!enabled) {
      setVisibleCount(itemCount);

      return;
    }

    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const compute = () => {
      const available = container.clientWidth;
      if (available === 0) return;

      const nodes = Array.from(measure.children) as HTMLElement[];
      if (nodes.length < 2) return;

      // Last node is the "+N" sample; the rest are the real chips.
      const plus = nodes[nodes.length - 1];
      const chips = nodes.slice(0, -1);

      const baseLeft = chips[0].offsetLeft;
      const right = (el: HTMLElement) => el.offsetLeft - baseLeft + el.offsetWidth;

      // Everything fits — no overflow chip needed.
      if (right(chips[chips.length - 1]) <= available) {
        setVisibleCount(chips.length);

        return;
      }

      const gap =
        chips.length > 1 ? chips[1].offsetLeft - (chips[0].offsetLeft + chips[0].offsetWidth) : 0;
      const reserve = plus.offsetWidth + gap;

      let count = 0;

      for (const chip of chips) {
        if (right(chip) <= available - reserve) {
          count += 1;
        } else {
          break;
        }
      }

      // Always keep at least the first chip ("All") visible.
      setVisibleCount(Math.max(count, 1));
    };

    compute();

    const observer = new ResizeObserver(compute);
    observer.observe(container);

    return () => observer.disconnect();
  }, [enabled, itemCount]);

  return { containerRef, measureRef, visibleCount };
}
