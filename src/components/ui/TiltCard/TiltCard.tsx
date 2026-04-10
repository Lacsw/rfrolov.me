"use client";

import { ReactNode, useRef } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks";

type TTiltCardProps = {
  children: ReactNode;
  maxTilt?: number;
  featured?: boolean;
  className?: string;
};

export function TiltCard({ children, maxTilt, featured = false, className }: TTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const tilt = maxTilt ?? (featured ? 8 : 4);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [tilt, -tilt]);
  const rotateY = useTransform(mouseX, [0, 1], [-tilt, tilt]);

  // Dynamic shadow offset — shifts opposite to the tilt so the card feels lifted
  const shadowX = useTransform(mouseX, [0, 1], [12, -12]);
  const shadowY = useTransform(mouseY, [0, 1], [12, -12]);

  const springConfig = { stiffness: 200, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothShadowX = useSpring(shadowX, springConfig);
  const smoothShadowY = useSpring(shadowY, springConfig);

  const boxShadow = useTransform(
    [smoothShadowX, smoothShadowY],
    ([x, y]: number[]) =>
      `${x}px ${y}px 32px rgba(0, 0, 0, ${featured ? 0.18 : 0.1}), 0 1px 2px rgba(0, 0, 0, 0.05)`
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        boxShadow,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        borderRadius: "var(--radius-lg, 0.5rem)",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
