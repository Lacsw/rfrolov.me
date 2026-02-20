"use client";

import { ReactNode, useId, useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type TCollapsibleProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function Collapsible({ title, children, defaultOpen = false }: TCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="my-4 rounded-lg border border-muted overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium",
          "bg-muted/50 transition-colors hover:opacity-70 cursor-pointer",
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
        id={contentId}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
