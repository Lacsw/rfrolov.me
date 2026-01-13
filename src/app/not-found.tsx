"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const TERMINAL_LINES = [
  { type: "command", text: "$ cd /requested-page" },
  { type: "error", text: "bash: cd: /requested-page: No such file or directory" },
  { type: "empty", text: "" },
  { type: "command", text: "$ cat error.log" },
  { type: "output", text: "Error 404: Page not found" },
  { type: "output", text: "The page you're looking for doesn't exist or has been moved." },
  { type: "empty", text: "" },
  { type: "command", text: "$ suggest --fix" },
  { type: "output", text: "Try one of these commands:" },
];

const PROMPT = "$ ";

export default function NotFound() {
  const [displayedLines, setDisplayedLines] = useState<typeof TERMINAL_LINES>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= TERMINAL_LINES.length) {
      setIsTypingComplete(true);
      return;
    }

    const currentLine = TERMINAL_LINES[currentLineIndex];
    const isCommand = currentLine.type === "command";
    const fullText = currentLine.text;

    // For commands, type character by character
    // For output/errors, show instantly after a delay
    if (isCommand) {
      if (currentCharIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            if (newLines.length === currentLineIndex) {
              newLines.push({ ...currentLine, text: fullText.slice(0, currentCharIndex + 1) });
            } else {
              newLines[currentLineIndex] = { ...currentLine, text: fullText.slice(0, currentCharIndex + 1) };
            }
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, 30 + Math.random() * 20); // Slight randomness for realism
        return () => clearTimeout(timeout);
      } else {
        // Command finished typing, move to next line after delay
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Non-command lines appear instantly after short delay
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, currentLine.type === "empty" ? 100 : 150);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  const getLineColor = (type: string) => {
    switch (type) {
      case "command":
        return "text-foreground";
      case "error":
        return "text-red-500";
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
          <div className="p-4 font-mono text-sm min-h-[300px]">
            {displayedLines.map((line, index) => (
              <div key={index} className={`${getLineColor(line.type)} leading-relaxed`}>
                {line.text || "\u00A0"}
              </div>
            ))}

            {/* Current typing line with cursor */}
            {!isTypingComplete && currentLineIndex < TERMINAL_LINES.length && (
              <div className="text-foreground leading-relaxed">
                {displayedLines.length === currentLineIndex && TERMINAL_LINES[currentLineIndex].type === "command" && (
                  <>
                    {displayedLines[currentLineIndex]?.text || PROMPT}
                    <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>
                      _
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Action buttons after typing complete */}
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 space-y-2"
              >
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

                {/* Blinking cursor at the end */}
                <div className="text-foreground mt-4">
                  {PROMPT}
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>
                    _
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Subtle hint */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Press any link above or use keyboard navigation
        </p>
      </div>
    </main>
  );
}
