import { ANIMATION_DURATION, createStaggerAnimation } from "@/constants";
import { TKeyStat } from "@/types";

export const KEY_STATS: TKeyStat[] = [
  { id: "years", value: "6+", labelKey: "experiencePage.stats.yearsExperience" },
  { id: "users", value: "2M+", labelKey: "experiencePage.stats.usersImpacted" },
  { id: "companies", value: "5", labelKey: "experiencePage.stats.companies" },
];

export const KEY_STATS_ANIMATION = createStaggerAnimation({
  staggerChildren: 0.15,
  offset: 20,
  duration: ANIMATION_DURATION.normal,
});
