"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

type TerminalLine = {
  type: "command" | "error" | "output" | "empty" | "success";
  text: string;
};

const INITIAL_LINES: TerminalLine[] = [
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

const ROUTES = [
  { path: "/", label: "home" },
  { path: "/projects", label: "work" },
];

const PROMPT = "$ ";

export default function NotFound() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [commandResult, setCommandResult] = useState<TerminalLine | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when typing complete
  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTypingComplete]);

  // Keyboard shortcuts (1 and 2)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isTypingComplete) return;
      if (document.activeElement === inputRef.current) return;

      if (e.key === "1") {
        router.push("/");
      } else if (e.key === "2") {
        router.push("/projects");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isTypingComplete, router]);

  // Initial typing animation
  useEffect(() => {
    if (currentLineIndex >= INITIAL_LINES.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = INITIAL_LINES[currentLineIndex];
    const isCommand = currentLine.type === "command";
    const fullText = currentLine.text;

    if (isCommand) {
      if (currentCharIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setLines((prev) => {
            const newLines = [...prev];
            if (newLines.length === currentLineIndex) {
              newLines.push({ ...currentLine, text: fullText.slice(0, currentCharIndex + 1) });
            } else {
              newLines[currentLineIndex] = { ...currentLine, text: fullText.slice(0, currentCharIndex + 1) };
            }
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 30 + Math.random() * 20);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.type === "empty" ? 100 : 150);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  // Update suggestion based on input
  useEffect(() => {
    if (!inputValue) {
      setSuggestion("");
      return;
    }

    const input = inputValue.toLowerCase();

    // Suggest "cd" command
    if ("cd".startsWith(input) && input !== "cd") {
      setSuggestion("cd".slice(input.length) + " /");
      return;
    }

    // If typing "cd " or "cd /...", suggest paths
    const cdMatch = input.match(/^cd\s+(.*)$/);
    if (cdMatch) {
      const pathInput = cdMatch[1];
      for (const route of ROUTES) {
        if (route.path.startsWith(pathInput) && route.path !== pathInput) {
          setSuggestion(route.path.slice(pathInput.length));
          return;
        }
      }
    }

    setSuggestion("");
  }, [inputValue]);

  const executeCommand = useCallback(
    (command: string) => {
      const cmd = command.trim();

      if (!cmd) return;

      // Parse command - expect "cd /path" format
      const cdMatch = cmd.match(/^cd\s+(.+)$/);
      if (cdMatch) {
        const path = cdMatch[1];
        const matchedRoute = ROUTES.find((r) => r.path === path);

        if (matchedRoute) {
          setCommandResult({ type: "success", text: `Navigating to ${matchedRoute.path}...` });
          setTimeout(() => router.push(matchedRoute.path), 500);
        } else {
          setCommandResult({ type: "error", text: `bash: cd: ${path}: No such file or directory` });
        }
      } else {
        setCommandResult({ type: "error", text: `bash: ${cmd.split(" ")[0]}: command not found` });
      }
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
      setSuggestion("");
    } else if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      setInputValue(inputValue + suggestion);
      setSuggestion("");
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-foreground";
      case "error":
        return "text-red-500";
      case "success":
        return "text-green-500";
      case "output":
        return "text-muted-foreground";
      default:
        return "text-foreground";
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Terminal window */}
        <div className="rounded-lg border border-muted overflow-hidden bg-muted/30">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-muted">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">terminal — 404</span>
          </div>

          {/* Terminal content */}
          <div
            ref={terminalRef}
            className="p-4 font-mono text-sm min-h-[300px] max-h-[400px] overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, index) => (
              <div key={index} className={`${getLineColor(line.type)} leading-relaxed whitespace-pre`}>
                {line.text || "\u00A0"}
              </div>
            ))}

            {/* Current typing line with cursor (during animation) */}
            {!isTypingComplete && currentLineIndex < INITIAL_LINES.length && (
              <div className="text-foreground leading-relaxed">
                {lines.length === currentLineIndex && INITIAL_LINES[currentLineIndex].type === "command" && (
                  <>
                    {lines[currentLineIndex]?.text || PROMPT}
                    <span className={`${showCursor ? "opacity-100" : "opacity-0"}`}>_</span>
                  </>
                )}
              </div>
            )}

            {/* Interactive section after animation */}
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {/* Clickable buttons */}
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-muted hover:bg-muted/50 hover:border-foreground/20 transition-colors"
                  >
                    <span className="text-green-500">→</span>
                    <span>cd /</span>
                    <span className="text-muted-foreground">(go home)</span>
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-muted hover:bg-muted/50 hover:border-foreground/20 transition-colors"
                  >
                    <span className="text-green-500">→</span>
                    <span>cd /projects</span>
                    <span className="text-muted-foreground">(view work)</span>
                  </Link>
                </div>

                {/* Interactive input */}
                <div className="flex items-center leading-relaxed">
                  <span className="text-foreground">{PROMPT}</span>
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        setCommandResult(null);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="cd /"
                      className="bg-transparent outline-none text-foreground w-full caret-transparent placeholder:text-muted-foreground/30"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    {/* Overlay showing input + suggestion + cursor */}
                    <div className="absolute inset-0 pointer-events-none flex items-center">
                      <span className="text-foreground">{inputValue}</span>
                      <span className="text-muted-foreground/50">{suggestion}</span>
                      <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-foreground`}>_</span>
                    </div>
                  </div>
                </div>

                {/* Command result */}
                {commandResult && (
                  <div className={`${getLineColor(commandResult.type)} leading-relaxed`}>
                    {commandResult.text}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* Hints */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Press any link above or use keyboard navigation
        </p>
      </div>
    </main>
  );
}
