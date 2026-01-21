import { TProjectCategory } from "@/types";

export const CATEGORY_COLORS: Record<TProjectCategory, string> = {
  personal: "bg-emerald-500/10 text-emerald-600",
  work: "bg-blue-500/10 text-blue-600",
  opensource: "bg-purple-500/10 text-purple-600",
};

export const CATEGORY_KEYS: (TProjectCategory | "all")[] = [
  "all",
  "personal",
  "work",
  "opensource",
];
