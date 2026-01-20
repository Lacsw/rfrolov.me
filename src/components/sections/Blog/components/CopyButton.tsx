"use client";

import { useCallback } from "react";

import { Copy } from "lucide-react";

import { useToast } from "@/components/ui";
import { cn } from "@/lib/utils";

type TCopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: TCopyButtonProps) {
  const { showToast } = useToast();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    } catch {
      showToast("Failed to copy");
    }
  }, [text, showToast]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "p-1 rounded transition-all duration-200 cursor-pointer",
        "text-muted-foreground/60 hover:text-foreground"
      )}
      aria-label="Copy code"
    >
      <Copy className="h-4 w-4" />
    </button>
  );
}
