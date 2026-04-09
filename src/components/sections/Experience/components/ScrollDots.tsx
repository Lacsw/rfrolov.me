"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { useScrollSpy } from "../hooks/useScrollSpy";

type TNavItem = {
  id: string;
  label: string;
};

type TProps = {
  items: TNavItem[];
};

export function ScrollDots({ items }: TProps) {
  const sectionIds = items.map((item) => item.id);
  const { activeId, hasScrolled } = useScrollSpy(sectionIds);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const activeIndex = items.findIndex((item) => item.id === activeId);

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
          <div className="flex flex-col items-center gap-1.5">
            {items.map((item, index) => {
              const isActive = item.id === activeId;
              const isPassed = index < activeIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative flex cursor-pointer items-center justify-center px-1 py-0.5"
                  aria-label={item.label}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                  <motion.span
                    className={cn(
                      "block w-[3px] rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-foreground"
                        : isPassed
                          ? "bg-foreground/50 group-hover:bg-foreground/70"
                          : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50"
                    )}
                    animate={{ height: isActive ? 28 : 12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
