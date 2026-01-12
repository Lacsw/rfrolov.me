export const HERO_CONTENT = {
  greeting: "Hi, my name is",
  name: "Roman Frolov",
  role: "Frontend Developer",
  description:
    "I build exceptional digital experiences with modern web technologies. Focused on creating clean, performant, and accessible interfaces.",
} as const;

export const ANIMATION_CONFIG = {
  morphingBlob: {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%",
    ] as string[],
    rotate: [0, 180, 360] as number[],
    duration: 20,
  },
  floatingImage: {
    y: [0, -12, 0] as number[],
    duration: 5,
  },
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    duration: 0.5,
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    duration: 0.5,
    delay: 0.2,
  },
};
