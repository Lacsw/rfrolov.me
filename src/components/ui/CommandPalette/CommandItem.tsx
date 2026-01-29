import { TRANSITION } from "@/constants";
import { cn } from "@/lib/utils";

import { TCommandItemProps } from "./types";

export function CommandItem({ command, isSelected, onSelect, onHover }: TCommandItemProps) {
  return (
    <li
      role="menuitem"
      tabIndex={-1}
      data-selected={isSelected}
      onMouseEnter={onHover}
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between gap-3 rounded-md px-3 py-2 cursor-pointer",
        TRANSITION.normal,
        isSelected ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-3">
        {command.icon}
        <span className="text-sm">{command.label}</span>
      </div>
      {command.shortcut && (
        <kbd className="rounded border border-muted bg-muted/50 px-1.5 py-0.5 text-xs">
          {command.shortcut}
        </kbd>
      )}
    </li>
  );
}
