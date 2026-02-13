import { TBlogPostMeta } from "@/types";

export type TCommand = {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  shortcutHint?: string;
  action: () => void;
  group: "navigation" | "actions" | "blog";
};

export type TCommandPaletteProps = {
  blogPosts?: TBlogPostMeta[];
};
