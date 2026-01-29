"use client";

import { ComponentProps, ReactNode } from "react";

import { motion } from "framer-motion";

import {
  CARD_BASE,
  CARD_BORDER,
  CARD_HOVER,
  EXTERNAL_LINK_PROPS,
  getStaggeredAnimation,
} from "@/constants";
import { useReducedMotion } from "@/hooks";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type TLinkHref = ComponentProps<typeof Link>["href"];

type TAnimatedCardProps = {
  children: ReactNode;
  index: number;
  className?: string;
  href?: string;
  featured?: boolean;
  large?: boolean;
  internal?: boolean;
};

export function AnimatedCard({
  children,
  index,
  className,
  href,
  featured = false,
  large = false,
  internal = false,
}: TAnimatedCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseClasses = cn(
    "group block h-full",
    CARD_BASE,
    CARD_HOVER,
    large && "md:col-span-2",
    featured ? CARD_BORDER.featured : CARD_BORDER.default,
    className
  );

  const animation = prefersReducedMotion ? {} : getStaggeredAnimation(index);

  if (href && internal) {
    return (
      <Link href={href as TLinkHref}>
        <motion.div {...animation} className={cn(baseClasses, "cursor-pointer")}>
          {children}
        </motion.div>
      </Link>
    );
  }

  if (href) {
    return (
      <motion.a
        href={href}
        {...EXTERNAL_LINK_PROPS}
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
