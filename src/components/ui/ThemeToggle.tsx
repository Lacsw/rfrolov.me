"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { ANIMATION_DURATION, ICON_SIZE } from "@/constants";
import { useHydrated } from "@/hooks";

import { IconButton } from "./IconButton";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const hydrated = useHydrated();

  if (!hydrated) {
    return (
      <IconButton aria-label="Toggle theme" disabled>
        <div className={ICON_SIZE.sm} />
      </IconButton>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <IconButton
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={{ duration: ANIMATION_DURATION.fast }}
        >
          {isDark ? <Sun className={ICON_SIZE.sm} /> : <Moon className={ICON_SIZE.sm} />}
        </motion.div>
      </AnimatePresence>
    </IconButton>
  );
}
