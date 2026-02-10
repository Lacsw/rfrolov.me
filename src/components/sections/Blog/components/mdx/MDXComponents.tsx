import { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { EXTERNAL_LINK_PROPS, HOVER_OPACITY } from "@/constants";
import { cn } from "@/lib/utils";

import { Callout } from "./Callout";
import { CodeBlock } from "./CodeBlock";
import { CollapsibleCode } from "./CollapsibleCode";
import { HeadingLink } from "./HeadingLink";

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
  h2: (props: THeadingProps) => <HeadingLink as="h2" {...props} />,
  h3: (props: THeadingProps) => <HeadingLink as="h3" {...props} />,
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
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className={cn("w-full text-sm border-collapse", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className={cn("border-b border-muted-foreground/30", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cn("text-left font-semibold text-foreground px-3 py-2", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cn("text-muted-foreground px-3 py-2 border-b border-muted", className)}
      {...props}
    />
  ),
  Callout,
  CollapsibleCode,
};
