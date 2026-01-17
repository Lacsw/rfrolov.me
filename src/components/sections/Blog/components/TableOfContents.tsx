"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { THeading } from "@/types";

// -96px accounts for sticky header, -66% triggers when heading is in top third of viewport
const TOC_OBSERVER_MARGIN = "-96px 0px -66% 0px";

type TTableOfContentsProps = {
  headings: THeading[];
};

export function TableOfContents({ headings }: TTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: TOC_OBSERVER_MARGIN }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="border-l border-muted">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block -ml-px border-l-2 py-1.5 text-sm transition-colors duration-150 cursor-pointer",
                  level === 2 ? "pl-4" : "pl-7",
                  isActive
                    ? "border-foreground text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
                )}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
