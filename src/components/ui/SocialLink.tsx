"use client";

import { motion } from "framer-motion";

import { EXTERNAL_LINK_PROPS, HOVER_TEXT_COLOR, ICON_SIZE } from "@/constants";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";
import { TSocialLink } from "@/types";

type TSocialLinkProps = TSocialLink & {
  className?: string;
};

export function SocialLink({ name, href, icon: Icon, className }: TSocialLinkProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      {...EXTERNAL_LINK_PROPS}
      className={cn(HOVER_TEXT_COLOR, "inline-block transition-colors duration-300", className)}
      aria-label={name}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { rotate: [0, -8, 8, -6, 6, 0], transition: { duration: 0.5 } }
      }
    >
      <Icon className={ICON_SIZE.md} />
    </motion.a>
  );
}
