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
import { useHydrated, useReducedMotion, useTactileSurface } from "@/hooks";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { ShineCard } from "./ShineCard";
import { TiltCard } from "./TiltCard";

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
  const hydrated = useHydrated();
  const isTactile = useTactileSurface("animated-card");

  const baseClasses = cn(
    "group block h-full",
    CARD_BASE,
    CARD_HOVER,
    large && "md:col-span-2",
    featured ? CARD_BORDER.featured : CARD_BORDER.default,
    className
  );

  // Defer the entrance animation until after hydration. The server renders
  // motion.div without initial/animate props, the first client render matches,
  // then the effect flips `hydrated` and Framer Motion plays the stagger.
  const animation = prefersReducedMotion || !hydrated ? {} : getStaggeredAnimation(index);
  const outerClasses = cn("h-full", large && "md:col-span-2");

  if (isTactile) {
    const tactileBaseClasses = cn(
      "group block h-full",
      "tactile-card",
      "rounded-lg border bg-background p-6",
      large && "md:col-span-2",
      featured ? "border-foreground/20" : "border-muted",
      className
    );

    if (href && internal) {
      return (
        <div className={outerClasses}>
          <Link href={href as TLinkHref}>
            <motion.div {...animation} className={cn(tactileBaseClasses, "cursor-pointer")}>
              {children}
            </motion.div>
          </Link>
        </div>
      );
    }

    if (href) {
      return (
        <div className={outerClasses}>
          <motion.a href={href} {...EXTERNAL_LINK_PROPS} {...animation} className={cn(tactileBaseClasses, "cursor-pointer")}>
            {children}
          </motion.a>
        </div>
      );
    }

    return (
      <div className={outerClasses}>
        <motion.div {...animation} className={tactileBaseClasses}>
          {children}
        </motion.div>
      </div>
    );
  }

  const inner = (() => {
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
  })();

  return (
    <TiltCard className={outerClasses} featured={featured}>
      <ShineCard className="h-full">{inner}</ShineCard>
    </TiltCard>
  );
}
