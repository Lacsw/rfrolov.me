import { ReactNode } from "react";

import { AlertTriangle, Info, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

type TCalloutVariant = "note" | "tip" | "warning";

type TProps = {
  variant?: TCalloutVariant;
  title?: string;
  children: ReactNode;
};

const variantConfig = {
  note: {
    icon: Info,
    containerClass: "border-blue-500/30 bg-blue-500/5",
    iconClass: "text-blue-500",
    titleClass: "text-blue-600",
    defaultTitle: "Note",
  },
  tip: {
    icon: Lightbulb,
    containerClass: "border-green-500/30 bg-green-500/5",
    iconClass: "text-green-500",
    titleClass: "text-green-600",
    defaultTitle: "Tip",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "border-amber-500/30 bg-amber-500/5",
    iconClass: "text-amber-500",
    titleClass: "text-amber-600",
    defaultTitle: "Warning",
  },
};

export function Callout({ variant = "note", title, children }: TProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn("my-6 rounded-lg border-l-4 p-4", config.containerClass)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn("size-5", config.iconClass)} />
        <span className={cn("font-semibold", config.titleClass)}>
          {title || config.defaultTitle}
        </span>
      </div>
      <div className="text-muted-foreground text-sm [&>p]:mb-0">{children}</div>
    </div>
  );
}
