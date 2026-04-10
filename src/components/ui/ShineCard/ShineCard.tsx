"use client";

import { ReactNode, useRef, useState, CSSProperties } from "react";

import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

type TShineCardProps = {
  children: ReactNode;
  className?: string;
};

type TShineStyle = CSSProperties & {
  "--shine-x"?: string;
  "--shine-y"?: string;
  "--shine-opacity"?: number;
};

export function ShineCard({ children, className }: TShineCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TShineStyle>({
    "--shine-x": "50%",
    "--shine-y": "50%",
    "--shine-opacity": 0,
  });
  const prefersReducedMotion = useReducedMotion();

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setStyle({ "--shine-x": `${x}%`, "--shine-y": `${y}%`, "--shine-opacity": 0.08 });
  }

  function handleMouseLeave() {
    setStyle((prev) => ({ ...prev, "--shine-opacity": 0 }));
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn("relative", className)}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle 200px at var(--shine-x) var(--shine-y), rgba(255,255,255,var(--shine-opacity)), transparent 70%)",
          opacity: "var(--shine-opacity)",
        }}
      />
    </div>
  );
}
