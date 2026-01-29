import { RefObject, useCallback, useEffect, useState } from "react";

import { TCommand } from "./types";

type TUseKeyboardNavigationProps = {
  isOpen: boolean;
  flatCommands: TCommand[];
  listRef: RefObject<HTMLUListElement | null>;
  query: string;
};

export function useKeyboardNavigation({
  isOpen,
  flatCommands,
  listRef,
  query,
}: TUseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

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
  }, [selectedIndex, listRef]);

  return { selectedIndex, setSelectedIndex, executeCommand };
}
