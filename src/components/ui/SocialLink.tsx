import { HOVER_TEXT_COLOR } from "@/constants";
import { cn } from "@/lib/utils";
import { TSocialLink } from "@/types";

type TSocialLinkProps = TSocialLink & {
  className?: string;
};

export function SocialLink({
  name,
  href,
  icon: Icon,
  className,
}: TSocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(HOVER_TEXT_COLOR, "transition-colors duration-300", className)}
      aria-label={name}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
