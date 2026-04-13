"use client";

import { memo, useCallback } from "react";

import { Copy } from "lucide-react";

import { useToast } from "@/components/ui";
import { useTactileSurface } from "@/hooks";
import { cn } from "@/lib/utils";

type TCopyButtonProps = {
  text: string;
};

export const CopyButton = memo(function CopyButton({ text }: TCopyButtonProps) {
  const { showToast } = useToast();
  const isTactile = useTactileSurface("copy-button");

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
      className={
        isTactile
          ? "tactile-surface tactile-surface--ghost tactile-surface--xs tactile-surface--square"
          : cn(
              "p-1 rounded transition-all duration-200 cursor-pointer",
              "text-muted-foreground/60 hover:text-foreground"
            )
      }
      aria-label="Copy code"
    >
      {isTactile ? (
        <span>
          <Copy className="h-4 w-4" />
        </span>
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
});
