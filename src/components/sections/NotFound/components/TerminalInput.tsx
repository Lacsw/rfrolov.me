"use client";

import { useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

import { PROMPT } from "../constants";

type TTerminalInputProps = {
  value: string;
  suggestion: string;
  showCursor: boolean;
  isActive: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onTabComplete: () => void;
};

export function TerminalInput({
  value,
  suggestion,
  showCursor,
  isActive,
  onChange,
  onSubmit,
  onTabComplete,
}: TTerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    } else if (e.key === "Tab" && suggestion) {
      e.preventDefault();
      onTabComplete();
    }
  };

  return (
    <div className="flex items-center leading-relaxed">
      <span className="text-foreground">{PROMPT}</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="cd /"
          className="bg-transparent outline-none text-foreground w-full caret-transparent placeholder:text-muted-foreground/30"
          spellCheck={false}
          autoComplete="off"
        />
        <div className="absolute inset-0 pointer-events-none flex items-center">
          <span className="text-foreground">{value}</span>
          <span className="text-muted-foreground/50">{suggestion}</span>
          <span className={cn("text-foreground", showCursor ? "opacity-100" : "opacity-0")}>_</span>
        </div>
      </div>
    </div>
  );
}
