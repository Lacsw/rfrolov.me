"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

type TNavItem = {
  id: string;
  label: string;
};

type TProps = {
  items: TNavItem[];
  activeId: string;
  hasScrolled: boolean;
};

export function ScrollDots({ items, activeId, hasScrolled }: TProps) {
  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {hasScrolled && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex"
          aria-label="Section navigation"
        >
          <div className="flex flex-col items-center gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative flex cursor-pointer items-center"
                aria-label={item.label}
                aria-current={activeId === item.id ? "true" : undefined}
              >
                <span
                  className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "block rounded-full transition-all duration-200",
                    activeId === item.id
                      ? "h-3 w-3 bg-foreground"
                      : "h-2 w-2 bg-muted-foreground/40 group-hover:bg-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
