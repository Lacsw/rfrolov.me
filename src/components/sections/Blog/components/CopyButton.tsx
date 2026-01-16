"use client";

import { useCallback, useState } from "react";

import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type TCopyButtonProps = {
  text: string;
};

export function CopyButton({ text }: TCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "absolute right-4 top-3 p-1 rounded transition-all duration-200 cursor-pointer",
        "text-muted-foreground/60 hover:text-foreground",
        "opacity-0 group-hover:opacity-100 focus:opacity-100"
      )}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
