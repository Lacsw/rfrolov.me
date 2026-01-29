import { TBlogPostMeta } from "@/types";

export type TCommand = {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  group: "navigation" | "actions" | "blog";
};

export type TCommandPaletteProps = {
  blogPosts?: TBlogPostMeta[];
};

export type TCommandItemProps = {
  command: TCommand;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
};
