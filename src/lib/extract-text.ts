import { Children, isValidElement, ReactNode } from "react";

/**
 * Recursively extracts text content from React children.
 * Useful for getting plain text from code blocks for copy functionality.
 */
export function extractTextFromChildren(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractTextFromChildren).join("");

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    if (props.children) return extractTextFromChildren(props.children);
  }

  return "";
}

/**
 * Extracts and trims text content from React children array.
 */
export function getTextContent(children: ReactNode): string {
  return Children.toArray(children).map(extractTextFromChildren).join("").trim();
}
