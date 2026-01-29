"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Command, Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { ANIMATION_DURATION, ICON_SIZE } from "@/constants";
import { useCommandPalette, useHydrated, useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

import { CommandItem } from "./CommandItem";
import { TCommandPaletteProps } from "./types";
import { useCommands } from "./useCommands";

export function CommandPalette({ blogPosts = [] }: TCommandPaletteProps) {
  const t = useTranslations();
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const { isOpen, close } = useCommandPalette();
  const commands = useCommands(blogPosts);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;

    return commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()));
  }, [commands, query]);

  const groupedCommands = useMemo(() => {
    const navigation = filteredCommands.filter((cmd) => cmd.group === "navigation");
    const actions = filteredCommands.filter((cmd) => cmd.group === "actions");
    const blog = filteredCommands.filter((cmd) => cmd.group === "blog");

    return { navigation, actions, blog };
  }, [filteredCommands]);

  const flatCommands = useMemo(
    () => [...groupedCommands.navigation, ...groupedCommands.actions, ...groupedCommands.blog],
    [groupedCommands]
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeCommand = useCallback(
    (index: number) => {
      const command = flatCommands[index];

      if (command) {
        command.action();
      }
    },
    [flatCommands]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % flatCommands.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + flatCommands.length) % flatCommands.length);
          break;
        case "Enter":
          e.preventDefault();
          executeCommand(selectedIndex);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, flatCommands.length, executeCommand]);

  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('[data-selected="true"]');

      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

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
              <div className="flex items-center gap-3 border-b border-muted px-4">
                <Search className={cn(ICON_SIZE.sm, "text-muted-foreground")} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("commandPalette.placeholder")}
                  className={cn(
                    "flex-1 bg-transparent py-4 text-sm outline-none",
                    "placeholder:text-muted-foreground"
                  )}
                />
                <kbd
                  onClick={close}
                  className={cn(
                    "hidden sm:inline-flex items-center gap-1 px-2 py-1",
                    "rounded border border-muted bg-muted/50 text-xs text-muted-foreground",
                    "cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                  )}
                >
                  ESC
                </kbd>
              </div>

              <ul ref={listRef} role="menu" className="max-h-80 overflow-y-auto p-2">
                {flatCommands.length === 0 ? (
                  <li className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {t("commandPalette.noResults")}
                  </li>
                ) : (
                  <>
                    {groupedCommands.navigation.length > 0 && (
                      <>
                        <li className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                          {t("commandPalette.navigation")}
                        </li>
                        {groupedCommands.navigation.map((cmd) => {
                          const globalIndex = flatCommands.indexOf(cmd);

                          return (
                            <CommandItem
                              key={cmd.id}
                              command={cmd}
                              isSelected={selectedIndex === globalIndex}
                              onSelect={() => executeCommand(globalIndex)}
                              onHover={() => setSelectedIndex(globalIndex)}
                            />
                          );
                        })}
                      </>
                    )}

                    {groupedCommands.actions.length > 0 && (
                      <>
                        <li
                          className={cn(
                            "px-2 py-1.5 text-xs font-medium text-muted-foreground",
                            groupedCommands.navigation.length > 0 && "mt-2"
                          )}
                        >
                          {t("commandPalette.actions")}
                        </li>
                        {groupedCommands.actions.map((cmd) => {
                          const globalIndex = flatCommands.indexOf(cmd);

                          return (
                            <CommandItem
                              key={cmd.id}
                              command={cmd}
                              isSelected={selectedIndex === globalIndex}
                              onSelect={() => executeCommand(globalIndex)}
                              onHover={() => setSelectedIndex(globalIndex)}
                            />
                          );
                        })}
                      </>
                    )}

                    {groupedCommands.blog.length > 0 && (
                      <>
                        <li
                          className={cn(
                            "px-2 py-1.5 text-xs font-medium text-muted-foreground",
                            (groupedCommands.navigation.length > 0 ||
                              groupedCommands.actions.length > 0) &&
                              "mt-2"
                          )}
                        >
                          {t("commandPalette.blog")}
                        </li>
                        {groupedCommands.blog.map((cmd) => {
                          const globalIndex = flatCommands.indexOf(cmd);

                          return (
                            <CommandItem
                              key={cmd.id}
                              command={cmd}
                              isSelected={selectedIndex === globalIndex}
                              onSelect={() => executeCommand(globalIndex)}
                              onHover={() => setSelectedIndex(globalIndex)}
                            />
                          );
                        })}
                      </>
                    )}
                  </>
                )}
              </ul>

              <div className="flex items-center justify-between border-t border-muted px-4 py-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-muted bg-muted/50 px-1.5 py-0.5">↑↓</kbd>
                    {t("commandPalette.toNavigate")}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded border border-muted bg-muted/50 px-1.5 py-0.5">↵</kbd>
                    {t("commandPalette.toSelect")}
                  </span>
                </div>
                <button
                  onClick={close}
                  className="flex items-center gap-1 rounded border border-muted bg-muted/50 px-2 py-1 text-xs text-muted-foreground cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
