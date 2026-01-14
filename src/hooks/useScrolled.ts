import { useEffect, useState } from "react";

/**
 * Returns true when the page has been scrolled past the threshold.
 * @param threshold - Scroll position in pixels to trigger (default: 50)
 */
export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
