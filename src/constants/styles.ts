export const HOVER_OPACITY = "hover:opacity-70 transition-opacity cursor-pointer";

export const HOVER_TEXT_COLOR = "text-muted-foreground hover:text-foreground";

export const CARD_BASE = "rounded-lg border bg-background p-6 transition-all duration-300";

export const CARD_HOVER = "hover:shadow-sm hover:scale-[1.01]";

export const CARD_BORDER = {
  featured: "border-muted-foreground/30 hover:border-muted-foreground/50",
  default: "border-muted hover:border-muted-foreground/20",
} as const;
