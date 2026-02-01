import { RefObject, useCallback, useEffect, useMemo, useState } from "react";

import { TCommand } from "../types";

type TUseKeyboardNavigationProps = {
  isOpen: boolean;
  flatCommands: TCommand[];
  commands: TCommand[];
  listRef: RefObject<HTMLUListElement | null>;
  query: string;
};

export function useKeyboardNavigation({
  isOpen,
  flatCommands,
  commands,
  listRef,
  query,
}: TUseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const shortcutMap = useMemo(() => {
    const map = new Map<string, TCommand>();

    for (const command of commands) {
      if (command.shortcut) {
        map.set(command.shortcut.toLowerCase(), command);
      }
    }

    return map;
  }, [commands]);

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
        default:
          if (e.key.length === 1) {
            const isTypingInInput =
              e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

            if (!isTypingInInput) {
              const command = shortcutMap.get(e.key.toLowerCase());

              if (command) {
                e.preventDefault();
                command.action();
              }
            }
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, flatCommands.length, executeCommand, query, shortcutMap]);

  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector('[data-selected="true"]');

      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, listRef]);

  return { selectedIndex, setSelectedIndex, executeCommand };
}
