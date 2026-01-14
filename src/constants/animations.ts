export const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const FADE_IN_TRANSITION = {
  duration: 0.5,
};

export function getFadeInTransition(index: number) {
  return {
    delay: index * 0.1,
    duration: 0.5,
  };
}
