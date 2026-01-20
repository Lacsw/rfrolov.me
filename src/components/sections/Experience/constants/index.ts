import { ANIMATION_DURATION, createStaggerAnimation } from "@/constants";

export const EXPERIENCE_ANIMATION = createStaggerAnimation({
  staggerChildren: 0.1,
  direction: "x",
  offset: -20,
  duration: ANIMATION_DURATION.slow,
});
