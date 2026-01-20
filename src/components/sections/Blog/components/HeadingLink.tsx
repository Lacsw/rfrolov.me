"use client";

import { ComponentPropsWithoutRef, useState } from "react";

import { Link2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { useToast } from "@/components/ui";
import { cn } from "@/lib/utils";

type THeadingLevel = "h1" | "h2" | "h3" | "h4";

type THeadingLinkProps = ComponentPropsWithoutRef<"h1"> & {
  as?: THeadingLevel;
};

const headingStyles: Record<THeadingLevel, string> = {
  h1: "text-2xl font-semibold tracking-tight mt-8 mb-4",
  h2: "text-xl font-semibold tracking-tight mt-8 mb-4 scroll-mt-24",
  h3: "text-lg font-semibold tracking-tight mt-6 mb-3 scroll-mt-24",
  h4: "text-base font-semibold tracking-tight mt-6 mb-3",
};

export function HeadingLink({
  as: Component = "h2",
  id,
  className,
  children,
  ...props
}: THeadingLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { showToast } = useToast();
  const t = useTranslations("common");

  const handleCopyLink = async () => {
    if (!id) return;

    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(url);
      showToast(t("linkCopied"));
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showToast(t("linkCopied"));
    }
  };

  return (
    <Component
      id={id}
      className={cn(headingStyles[Component], "group relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
      {id && (
        <button
          onClick={handleCopyLink}
          className={cn(
            "ml-2 inline-flex items-center justify-center align-middle",
            "cursor-pointer text-muted-foreground hover:text-foreground",
            "transition-opacity duration-150",
            isHovered ? "opacity-100" : "opacity-0",
            "focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          )}
          aria-label={t("copyLink")}
        >
          <Link2 className="h-4 w-4" />
        </button>
      )}
    </Component>
  );
}
