import { TCommand } from "../types";

type TCommandShortcutHintsProps = {
  shortcuts: TCommand[];
};

export function CommandShortcutHints({ shortcuts }: TCommandShortcutHintsProps) {
  if (shortcuts.length === 0) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground">
      {shortcuts.map((cmd) => (
        <span key={cmd.id} className="flex items-center gap-1.5">
          <kbd className="rounded border border-muted bg-muted/50 px-1.5 py-0.5">
            {cmd.shortcut}
          </kbd>
          <span>{cmd.shortcutHint}</span>
        </span>
      ))}
    </div>
  );
}
