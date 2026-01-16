"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { getStaggeredAnimation } from "@/constants";
import { cn } from "@/lib/utils";

type TAnimatedCardProps = {
  children: ReactNode;
  index: number;
  className?: string;
  href?: string;
  featured?: boolean;
  large?: boolean;
};

export function AnimatedCard({
  children,
  index,
  className,
  href,
  featured = false,
  large = false,
}: TAnimatedCardProps) {
  const baseClasses = cn(
    "group block h-full rounded-lg border bg-background p-6 transition-all duration-300 hover:shadow-sm hover:scale-[1.01]",
    large && "md:col-span-2",
    featured
      ? "border-muted-foreground/30 hover:border-muted-foreground/50"
      : "border-muted hover:border-muted-foreground/20",
    className
  );

  const animation = getStaggeredAnimation(index);

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...animation}
        className={cn(baseClasses, "cursor-pointer")}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div {...animation} className={baseClasses}>
      {children}
    </motion.div>
  );
}
