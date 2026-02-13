import { RefObject } from "react";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { ICON_SIZE } from "@/constants";
import { cn } from "@/lib/utils";

import { KBD_BASE } from "../styles";

type TCommandSearchInputProps = {
  inputRef: RefObject<HTMLInputElement | null>;
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
};

export function CommandSearchInput({
  inputRef,
  query,
  onQueryChange,
  onClose,
}: TCommandSearchInputProps) {
  const t = useTranslations();

  return (
    <div className="flex items-center gap-3 border-b border-muted px-4">
      <Search className={cn(ICON_SIZE.sm, "text-muted-foreground")} />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={t("commandPalette.placeholder")}
        className={cn(
          "flex-1 bg-transparent py-4 text-sm outline-none",
          "placeholder:text-muted-foreground"
        )}
      />
      <kbd
        onClick={onClose}
        className={cn(
          KBD_BASE,
          "hidden sm:inline-flex items-center gap-1 px-2 py-1",
          "text-xs text-muted-foreground",
          "cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
        )}
      >
        ESC
      </kbd>
    </div>
  );
}
