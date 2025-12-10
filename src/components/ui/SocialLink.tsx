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
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors duration-300",
        className
      )}
      aria-label={name}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
