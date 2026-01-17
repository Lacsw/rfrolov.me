import { EXTERNAL_LINK_PROPS, HOVER_TEXT_COLOR, ICON_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TSocialLink } from "@/types";

type TSocialLinkProps = TSocialLink & {
  className?: string;
};

export function SocialLink({ name, href, icon: Icon, className }: TSocialLinkProps) {
  return (
    <a
      href={href}
      {...EXTERNAL_LINK_PROPS}
      className={cn(HOVER_TEXT_COLOR, "transition-colors duration-300", className)}
      aria-label={name}
    >
      <Icon className={ICON_SIZE.md} />
    </a>
  );
}
