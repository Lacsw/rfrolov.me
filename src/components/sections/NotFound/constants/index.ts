export type TTerminalLineType = "command" | "error" | "output" | "empty" | "success";

export type TTerminalLine = {
  type: TTerminalLineType;
  text: string;
};

export const PROMPT = "$ ";

export const INITIAL_LINES: TTerminalLine[] = [
  { type: "command", text: "$ cd /requested-page" },
  { type: "error", text: "bash: cd: /requested-page: No such file or directory" },
  { type: "empty", text: "" },
  { type: "command", text: "$ cat error.log" },
  { type: "output", text: "Error 404: Page not found" },
  { type: "output", text: "The page you're looking for doesn't exist or has been moved." },
  { type: "empty", text: "" },
  { type: "command", text: "$ suggest --fix" },
  { type: "output", text: "Available paths:" },
];

export const TYPING_SPEED = {
  character: { min: 30, variance: 20 },
  lineDelay: 300,
  outputDelay: 150,
  emptyLineDelay: 100,
};

export const CURSOR_BLINK_INTERVAL = 530;
