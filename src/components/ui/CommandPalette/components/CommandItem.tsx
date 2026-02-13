import { TRANSITION } from "@/constants";
import { cn } from "@/lib/utils";

import { TCommand } from "../types";

type TCommandItemProps = {
  command: TCommand;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
};

export function CommandItem({ command, isSelected, onSelect, onHover }: TCommandItemProps) {
  const { icon, label } = command;

  return (
    <li
      role="menuitem"
      tabIndex={-1}
      data-selected={isSelected}
      onMouseEnter={onHover}
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer",
        TRANSITION.normal,
        isSelected ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted/50"
      )}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </li>
  );
}
