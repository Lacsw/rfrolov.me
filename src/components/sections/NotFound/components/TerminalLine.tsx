import { type TerminalLineType } from "../constants";

type TerminalLineProps = {
  type: TerminalLineType;
  text: string;
};

const LINE_COLORS: Record<TerminalLineType, string> = {
  command: "text-foreground",
  error: "text-red-500",
  success: "text-green-500",
  output: "text-muted-foreground",
  empty: "text-foreground",
};

export function TerminalLine({ type, text }: TerminalLineProps) {
  return (
    <div className={`${LINE_COLORS[type]} leading-relaxed whitespace-pre`}>
      {text || "\u00A0"}
    </div>
  );
}
