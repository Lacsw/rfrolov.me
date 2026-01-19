import { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { EXTERNAL_LINK_PROPS, HOVER_OPACITY } from "@/constants";
import { cn } from "@/lib/utils";

import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { CollapsibleCode } from "./CollapsibleCode";

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
    <h1 className={cn("text-2xl font-semibold tracking-tight mt-8 mb-4", className)} {...props} />
  ),
  h2: ({ className, ...props }: THeadingProps) => (
    <h2
      className={cn("text-xl font-semibold tracking-tight mt-8 mb-4 scroll-mt-24", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: THeadingProps) => (
    <h3
      className={cn("text-lg font-semibold tracking-tight mt-6 mb-3 scroll-mt-24", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: THeadingProps) => (
    <h4 className={cn("text-base font-semibold tracking-tight mt-6 mb-3", className)} {...props} />
  ),
  p: ({ className, ...props }: TParagraphProps) => (
    <p className={cn("text-muted-foreground leading-relaxed mb-4", className)} {...props} />
  ),
  a: ({ href, className, ...props }: TLinkProps) => {
    const isExternal = href?.startsWith("http");
    const linkClassName = cn(
      "text-foreground underline underline-offset-4",
      HOVER_OPACITY,
      className
    );

    if (isExternal) {
      return <a href={href} {...EXTERNAL_LINK_PROPS} className={linkClassName} {...props} />;
    }

    return <Link href={href || "#"} className={linkClassName} {...props} />;
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
        <code className={cn("bg-muted px-1.5 py-0.5 rounded text-sm", className)} {...props} />
      );
    }

    return <code className={className} {...props} />;
  },
  pre: ({ className, children }: TPreProps) => (
    <CodeBlock className={className}>{children}</CodeBlock>
  ),
  hr: () => <hr className="border-muted my-8" />,
  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  mark: ({ className, ...props }: ComponentPropsWithoutRef<"mark">) => (
    <mark
      className={cn("bg-yellow-200/70 text-foreground px-1 rounded-sm", className)}
      {...props}
    />
  ),
  Callout,
  CollapsibleCode,
};
