"use client";

import { Children, isValidElement, ReactNode, useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { CopyButton } from "./CopyButton";

type TCollapsibleCodeProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

function extractTextFromChildren(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractTextFromChildren).join("");

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children) return extractTextFromChildren(props.children);
  }

  return "";
}

export function CollapsibleCode({ title, children, defaultOpen = false }: TCollapsibleCodeProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const codeContent = Children.toArray(children).map(extractTextFromChildren).join("").trim();

  return (
    <div className="my-4 rounded-lg border border-muted overflow-hidden">
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          "bg-muted/50 transition-colors",
          !isOpen && "rounded-b-lg"
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-left text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span>{title}</span>
        </button>
        <CopyButton text={codeContent} />
      </div>
      <div
        className={cn(
          "transition-all duration-200 ease-in-out overflow-hidden",
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="collapsible-code-content [&_.code-block-header]:hidden [&>div]:my-0 [&>div]:rounded-none [&>div]:border-0">
          {children}
        </div>
      </div>
    </div>
  );
}
