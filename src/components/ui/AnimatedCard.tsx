"use client";

import { FADE_IN, getFadeInTransition } from "@/constants/animations";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type TAnimatedCardProps = {
  children: ReactNode;
  index: number;
  className?: string;
  href?: string;
};

export function AnimatedCard({ children, index, className, href }: TAnimatedCardProps) {
  const baseClasses = cn(
    "group block h-full rounded-lg border border-muted bg-background p-6 transition-all duration-300 hover:border-muted-foreground/20 hover:shadow-sm",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...FADE_IN}
        transition={getFadeInTransition(index)}
        className={cn(baseClasses, "cursor-pointer")}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div
      {...FADE_IN}
      transition={getFadeInTransition(index)}
      className={baseClasses}
    >
      {children}
    </motion.div>
  );
}
