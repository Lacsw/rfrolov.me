import { cn } from "@/lib/utils";

import { type TTerminalLineType } from "../constants";

type TProps = {
  type: TTerminalLineType;
  text: string;
};

const LINE_COLORS: Record<TTerminalLineType, string> = {
  command: "text-foreground",
  error: "text-red-500",
  success: "text-green-500",
  output: "text-muted-foreground",
  empty: "text-foreground",
};

export function TerminalLine({ type, text }: TProps) {
  return (
    <div className={cn(LINE_COLORS[type], "leading-relaxed whitespace-pre")}>
      {text || "\u00A0"}
    </div>
  );
}
