"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { INITIAL_LINES, PROMPT } from "./constants";
import { useBlinkingCursor, useTerminalTyping, useTerminalInput } from "./hooks";
import { TerminalLine, TerminalInput, NavigationLinks, TerminalWindow } from "./components";

export function NotFoundTerminal() {
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const showCursor = useBlinkingCursor();
  const { lines, currentLineIndex, isTypingComplete } = useTerminalTyping();
  const {
    inputValue,
    suggestion,
    commandResult,
    handleInputChange,
    handleSubmit,
    handleTabComplete,
  } = useTerminalInput();

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Keyboard shortcuts (1 and 2) when not focused on input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!isTypingComplete) return;
      const activeElement = document.activeElement;
      if (activeElement?.tagName === "INPUT") return;

      if (e.key === "1") {
        router.push("/");
      } else if (e.key === "2") {
        router.push("/projects");
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isTypingComplete, router]);

  return (
    <div className="w-full max-w-2xl">
      <TerminalWindow>
        <div ref={terminalRef}>
          {/* Rendered lines */}
          {lines.map((line, index) => (
            <TerminalLine key={index} type={line.type} text={line.text} />
          ))}

          {/* Current typing line with cursor (during animation) */}
          {!isTypingComplete && currentLineIndex < INITIAL_LINES.length && (
            <div className="text-foreground leading-relaxed">
              {lines.length === currentLineIndex && INITIAL_LINES[currentLineIndex].type === "command" && (
                <>
                  {lines[currentLineIndex]?.text || PROMPT}
                  <span className={showCursor ? "opacity-100" : "opacity-0"}>_</span>
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
              <NavigationLinks />

              <TerminalInput
                value={inputValue}
                suggestion={suggestion}
                showCursor={showCursor}
                isActive={isTypingComplete}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onTabComplete={handleTabComplete}
              />

              {/* Command result */}
              {commandResult && (
                <TerminalLine type={commandResult.type} text={commandResult.text} />
              )}
            </motion.div>
          )}
        </div>
      </TerminalWindow>

      {/* Hints */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        Press any link above or use keyboard navigation
      </p>
    </div>
  );
}
