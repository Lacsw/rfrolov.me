"use client";

import { m } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TTag = "h1" | "h2" | "h3" | "p" | "span";

type TRevealTextProps = {
  text: string;
  as?: TTag;
  className?: string;
  delay?: number;
  staggerDelay?: number;
};

export function RevealText({
  text,
  as = "span",
  className,
  delay = 0,
  staggerDelay = 0.05,
}: TRevealTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = m[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <m.span
          key={`${word}-${index}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </m.span>
      ))}
    </MotionTag>
  );
}
