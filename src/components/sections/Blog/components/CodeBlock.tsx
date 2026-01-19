"use client";

import { Children, isValidElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CopyButton } from "./CopyButton";

type TCodeBlockProps = {
  children: ReactNode;
  className?: string;
};

function extractText(node: ReactNode): string {
  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };

    if (props.children) {
      return extractText(props.children);
    }
  }

  return "";
}

export function CodeBlock({ children, className }: TCodeBlockProps) {
  const codeContent = Children.toArray(children).map(extractText).join("").trim();

  return (
    <div className="my-4 rounded-lg border border-muted overflow-hidden">
      <div className="code-block-header flex items-center justify-end px-4 py-2 bg-muted/50 border-b border-muted">
        <CopyButton text={codeContent} />
      </div>
      <div className="overflow-x-auto">
        <pre className={cn("p-4 text-sm min-w-max", className)}>{children}</pre>
      </div>
    </div>
  );
}
