"use client";

import { AnimatePresence, motion } from "framer-motion";

type TNavItem = {
  id: string;
  label: string;
};

type TProps = {
  items: TNavItem[];
  activeId: string;
  hasScrolled: boolean;
};

export function ScrollLabel({ items, activeId, hasScrolled }: TProps) {
  const activeLabel = items.find((item) => item.id === activeId)?.label ?? "";

  return (
    <AnimatePresence mode="wait">
      {hasScrolled && (
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-10 text-xs text-muted-foreground"
          aria-live="polite"
          aria-label={`Current section: ${activeLabel}`}
        >
          <span className="font-mono">// {activeLabel.toLowerCase()}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
