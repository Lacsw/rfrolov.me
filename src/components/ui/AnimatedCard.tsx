"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { CARD_BASE, CARD_BORDER, CARD_HOVER, getStaggeredAnimation } from "@/constants";
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
    "group block h-full",
    CARD_BASE,
    CARD_HOVER,
    large && "md:col-span-2",
    featured ? CARD_BORDER.featured : CARD_BORDER.default,
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
