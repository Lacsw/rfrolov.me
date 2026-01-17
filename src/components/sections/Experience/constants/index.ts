import { ANIMATION_DURATION } from "@/constants";

export const EXPERIENCE_ANIMATION = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION_DURATION.slow,
        ease: "easeOut",
      },
    },
  },
} as const;
