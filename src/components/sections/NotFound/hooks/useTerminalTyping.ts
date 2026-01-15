import { useEffect, useState } from "react";

import { INITIAL_LINES, TYPING_SPEED, type TTerminalLine } from "../constants";

export function useTerminalTyping() {
  const [lines, setLines] = useState<TTerminalLine[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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
        }, TYPING_SPEED.character.min + Math.random() * TYPING_SPEED.character.variance);

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, TYPING_SPEED.lineDelay);

        return () => clearTimeout(timeout);
      }
    } else {
      const delay = currentLine.type === "empty" ? TYPING_SPEED.emptyLineDelay : TYPING_SPEED.outputDelay;
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return { lines, currentLineIndex, isTypingComplete };
}
