"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TNavItem = {
  id: string;
  label: string;
};

type TProps = {
  items: TNavItem[];
};

export function SectionNav({ items }: TProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="sticky top-16 z-10 -mx-6 mb-2 overflow-x-auto border-b border-muted bg-background/80 px-6 backdrop-blur-sm lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-5xl gap-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={cn(
              "shrink-0 border-b-2 py-2.5 text-xs transition-colors duration-200",
              activeId === item.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
