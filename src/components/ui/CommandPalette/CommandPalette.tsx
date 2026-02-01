"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ANIMATION_DURATION } from "@/constants";
import { useCommandPalette, useHydrated, useReducedMotion } from "@/hooks";

import { CommandFooter, CommandGroup, CommandSearchInput } from "./components";
import { useCommandFilter, useCommands, useKeyboardNavigation } from "./hooks";
import { TCommandPaletteProps } from "./types";

export function CommandPalette({ blogPosts = [] }: TCommandPaletteProps) {
  const t = useTranslations();
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const { isOpen, close } = useCommandPalette();

  const commands = useCommands(blogPosts);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { groupedCommands, flatCommands } = useCommandFilter(commands, query);
  const { selectedIndex, setSelectedIndex, executeCommand } = useKeyboardNavigation({
    isOpen,
    flatCommands,
    commands,
    listRef,
    query,
  });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  if (!hydrated) return null;

  const animationDuration = prefersReducedMotion ? 0 : ANIMATION_DURATION.fast;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-background/80 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: animationDuration }}
            className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-lg border border-muted bg-background shadow-lg">
              <CommandSearchInput
                inputRef={inputRef}
                query={query}
                onQueryChange={setQuery}
                onClose={close}
              />

              <ul ref={listRef} role="menu" className="max-h-80 overflow-y-auto p-2">
                {flatCommands.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {t("commandPalette.noResults")}
                  </li>
                ) : (
                  <>
                    <CommandGroup
                      label={t("commandPalette.navigation")}
                      commands={groupedCommands.navigation}
                      flatCommands={flatCommands}
                      selectedIndex={selectedIndex}
                      onSelect={executeCommand}
                      onHover={setSelectedIndex}
                      isFirst
                    />
                    <CommandGroup
                      label={t("commandPalette.actions")}
                      commands={groupedCommands.actions}
                      flatCommands={flatCommands}
                      selectedIndex={selectedIndex}
                      onSelect={executeCommand}
                      onHover={setSelectedIndex}
                    />
                    <CommandGroup
                      label={t("commandPalette.blog")}
                      commands={groupedCommands.blog}
                      flatCommands={flatCommands}
                      selectedIndex={selectedIndex}
                      onSelect={executeCommand}
                      onHover={setSelectedIndex}
                    />
                  </>
                )}
              </ul>

              <CommandFooter onClose={close} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
