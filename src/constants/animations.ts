export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.4,
  slower: 0.5,
} as const;

export const TOAST_DURATION_MS = 2000;

export const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN_TRANSITION = {
  duration: ANIMATION_DURATION.slower,
};

type TStaggerOptions = {
  y?: number;
  delayMultiplier?: number;
  duration?: number;
};

export function getStaggeredAnimation(index: number, options: TStaggerOptions = {}) {
  const { y = 20, delayMultiplier = 0.1, duration = ANIMATION_DURATION.slower } = options;

  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * delayMultiplier, duration },
  };
}
