"use client";

import { useEffect, useState } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TCursorState = "default" | "link" | "view" | "copy";

const STATE_LABEL: Record<"view" | "copy", string> = {
  view: "View",
  copy: "Copy",
};

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [state, setState] = useState<TCursorState>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 500, damping: 30, mass: 0.3 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 30, mass: 0.3 });

  useEffect(() => {
    const mql = window.matchMedia("(pointer: fine)");
    setIsTouchDevice(!mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

    function handleMouseMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as HTMLElement | null;
      if (!target) {
        setState("default");
        return;
      }

      if (target.closest("[data-cursor='copy']")) {
        setState("copy");
      } else if (target.closest("[data-cursor='view']")) {
        setState("view");
      } else if (target.closest("a, button, [role='button']")) {
        setState("link");
      } else {
        setState("default");
      }
    }

    function handleMouseLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice, prefersReducedMotion, x, y]);

  if (isTouchDevice || prefersReducedMotion) return null;

  const isExpanded = state !== "default";
  const label = state === "view" || state === "copy" ? STATE_LABEL[state] : null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: smoothX, y: smoothY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-white text-xs font-medium text-black"
        animate={{
          width: isExpanded ? 56 : 8,
          height: isExpanded ? 56 : 8,
          x: isExpanded ? -28 : -4,
          y: isExpanded ? -28 : -4,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
