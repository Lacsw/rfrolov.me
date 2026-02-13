export const HOVER_OPACITY = "hover:opacity-70 transition-opacity cursor-pointer";

export const HOVER_TEXT_COLOR = "text-muted-foreground hover:text-foreground";

export const CARD_BASE = "rounded-lg border bg-background p-6 transition-all duration-300";

export const CARD_HOVER = "hover:shadow-sm hover:scale-[1.01]";

export const CARD_BORDER = {
  featured: "border-muted-foreground/40 hover:border-muted-foreground/60",
  default: "border-muted hover:border-muted-foreground/30",
} as const;

export const ICON_SIZE = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export const TEXT_SIZE = {
  label: "text-xs",
  body: "text-sm",
  heading: "text-lg",
  title: "text-2xl",
} as const;

export const TRANSITION = {
  fast: "duration-100",
  normal: "duration-200",
  slow: "duration-300",
} as const;

export const SPACING = {
  section: "py-12 lg:py-16",
  gap: {
    xs: "gap-1.5",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  },
} as const;

export const ARROW_HOVER = {
  upRight:
    "transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  right: "transition-transform duration-200 group-hover:translate-x-1",
} as const;

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
