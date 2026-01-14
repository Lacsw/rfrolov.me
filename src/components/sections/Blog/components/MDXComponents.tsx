import { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { cn } from "@/lib/utils";

type THeadingProps = ComponentPropsWithoutRef<"h1">;
type TParagraphProps = ComponentPropsWithoutRef<"p">;
type TLinkProps = ComponentPropsWithoutRef<"a">;
type TListProps = ComponentPropsWithoutRef<"ul">;
type TListItemProps = ComponentPropsWithoutRef<"li">;
type TBlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type TCodeProps = ComponentPropsWithoutRef<"code">;
type TPreProps = ComponentPropsWithoutRef<"pre">;

export const mdxComponents = {
  h1: ({ className, ...props }: THeadingProps) => (
    <h1
      className={cn("text-2xl font-semibold tracking-tight mt-8 mb-4", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: THeadingProps) => (
    <h2
      className={cn("text-xl font-semibold tracking-tight mt-8 mb-4", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: THeadingProps) => (
    <h3
      className={cn("text-lg font-semibold tracking-tight mt-6 mb-3", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: THeadingProps) => (
    <h4
      className={cn("text-base font-semibold tracking-tight mt-6 mb-3", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: TParagraphProps) => (
    <p
      className={cn("text-muted-foreground leading-relaxed mb-4", className)}
      {...props}
    />
  ),
  a: ({ href, className, ...props }: TLinkProps) => {
    const isExternal = href?.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer",
            className
          )}
          {...props}
        />
      );
    }

    return (
      <Link
        href={href || "#"}
        className={cn(
          "text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity cursor-pointer",
          className
        )}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }: TListProps) => (
    <ul
      className={cn("list-disc list-inside mb-4 text-muted-foreground space-y-1", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: TListProps) => (
    <ol
      className={cn("list-decimal list-inside mb-4 text-muted-foreground space-y-1", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: TListItemProps) => (
    <li className={cn("leading-relaxed", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: TBlockquoteProps) => (
    <blockquote
      className={cn(
        "border-l-2 border-muted-foreground/30 pl-4 italic text-muted-foreground my-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: TCodeProps) => {
    const isInlineCode = !className?.includes("language-");

    if (isInlineCode) {
      return (
        <code
          className={cn("bg-muted px-1.5 py-0.5 rounded text-sm", className)}
          {...props}
        />
      );
    }

    return <code className={className} {...props} />;
  },
  pre: ({ className, ...props }: TPreProps) => (
    <pre
      className={cn(
        "rounded-lg p-4 overflow-x-auto my-4 text-sm",
        className
      )}
      {...props}
    />
  ),
  hr: () => <hr className="border-muted my-8" />,
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
};
