export const TAG_COLORS: Record<string, string> = {
  nextjs: "bg-blue-500/10 text-blue-600",
  typescript: "bg-blue-500/10 text-blue-600",
  react: "bg-cyan-500/10 text-cyan-600",
  tailwind: "bg-teal-500/10 text-teal-600",
  "framer-motion": "bg-purple-500/10 text-purple-600",
  ui: "bg-pink-500/10 text-pink-600",
  portfolio: "bg-emerald-500/10 text-emerald-600",
} as const;

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] || "bg-muted text-muted-foreground";
}
