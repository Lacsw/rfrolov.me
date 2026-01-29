import { cn } from "@/lib/utils";

import { CommandItem } from "./CommandItem";
import { TCommand } from "./types";

type TCommandGroupProps = {
  label: string;
  commands: TCommand[];
  flatCommands: TCommand[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onHover: (index: number) => void;
  isFirst?: boolean;
};

export function CommandGroup({
  label,
  commands,
  flatCommands,
  selectedIndex,
  onSelect,
  onHover,
  isFirst = false,
}: TCommandGroupProps) {
  if (commands.length === 0) return null;

  return (
    <>
      <li
        className={cn(
          "px-2 py-1.5 text-xs font-medium text-muted-foreground",
          !isFirst && "mt-2"
        )}
      >
        {label}
      </li>
      {commands.map((cmd) => {
        const globalIndex = flatCommands.indexOf(cmd);

        return (
          <CommandItem
            key={cmd.id}
            command={cmd}
            isSelected={selectedIndex === globalIndex}
            onSelect={() => onSelect(globalIndex)}
            onHover={() => onHover(globalIndex)}
          />
        );
      })}
    </>
  );
}
