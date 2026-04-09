"use client";

import { AnimatePresence, motion } from "framer-motion";

type TProps = {
  scrollProgress: number;
  hasScrolled: boolean;
};

export function ScrollTrack({ scrollProgress, hasScrolled }: TProps) {
  return (
    <AnimatePresence>
      {hasScrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 z-10 hidden h-32 -translate-y-1/2 lg:block"
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        >
          <div className="relative h-full w-0.5 rounded-full bg-muted-foreground/20">
            <motion.div
              className="absolute top-0 w-full rounded-full bg-foreground"
              style={{ height: `${scrollProgress * 100}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
