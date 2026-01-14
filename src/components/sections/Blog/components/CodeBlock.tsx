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
  const codeContent = Children.toArray(children)
    .map(extractText)
    .join("")
    .trim();

  return (
    <div className="group relative my-4 rounded-lg overflow-hidden">
      <pre className={cn("p-4 overflow-x-auto text-sm", className)}>
        {children}
      </pre>
      <CopyButton text={codeContent} />
    </div>
  );
}
