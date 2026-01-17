export const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN_TRANSITION = {
  duration: 0.5,
};

type TStaggerOptions = {
  y?: number;
  delayMultiplier?: number;
  duration?: number;
};

export function getStaggeredAnimation(index: number, options: TStaggerOptions = {}) {
  const { y = 20, delayMultiplier = 0.1, duration = 0.5 } = options;

  return {
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * delayMultiplier, duration },
  };
}
