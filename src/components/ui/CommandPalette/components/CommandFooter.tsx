import { Command } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { KBD_BASE } from "../styles";

type TCommandFooterProps = {
  onClose: () => void;
};

export function CommandFooter({ onClose }: TCommandFooterProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center justify-between border-t border-muted px-4 py-2">
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <kbd className={cn(KBD_BASE, "px-1.5 py-0.5")}>↑↓</kbd>
          {t("commandPalette.toNavigate")}
        </span>
        <span className="flex items-center gap-1">
          <kbd className={cn(KBD_BASE, "px-1.5 py-0.5")}>↵</kbd>
          {t("commandPalette.toSelect")}
        </span>
      </div>
      <button
        onClick={onClose}
        className={cn(
          KBD_BASE,
          "flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground",
          "cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
        )}
      >
        <Command className="h-3 w-3" />
        <span>K</span>
      </button>
    </div>
  );
}
