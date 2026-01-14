"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { THeading } from "@/types";

type TTableOfContentsProps = {
  headings: THeading[];
};

export function TableOfContents({ headings }: TTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
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
    <nav className="space-y-2">
      <p className="text-sm font-medium text-foreground">On this page</p>
      <ul className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "block text-sm transition-colors hover:text-foreground cursor-pointer",
                level === 3 && "pl-3",
                activeId === id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
