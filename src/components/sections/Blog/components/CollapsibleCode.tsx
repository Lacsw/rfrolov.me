"use client";

import { ReactNode, useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type TCollapsibleCodeProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function CollapsibleCode({ title, children, defaultOpen = false }: TCollapsibleCodeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-4 rounded-lg border border-muted overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium",
          "bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer",
          !isOpen && "rounded-b-lg"
        )}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
        <span>{title}</span>
      </button>
      <div
        className={cn(
          "transition-all duration-200 ease-in-out overflow-hidden",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="[&>div]:my-0 [&>div]:rounded-none [&>div]:border-0">{children}</div>
      </div>
    </div>
  );
}
