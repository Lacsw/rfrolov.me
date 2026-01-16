"use client";

import { useTranslations } from "next-intl";

import { Container, ThemeToggle } from "@/components/ui";
import { HOVER_TEXT_COLOR } from "@/constants";
import { useScrolled } from "@/hooks";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const scrolled = useScrolled(50);

  const navLinks = [
    { name: t("home"), href: "/" as const },
    { name: t("projects"), href: "/projects" as const },
    { name: t("blog"), href: "/blog" as const },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-sm border-b border-muted" : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16">
          <Link href="/" className="font-semibold text-foreground">
            RF
          </Link>

          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm transition-colors duration-300",
                      pathname === link.href ? "text-foreground" : HOVER_TEXT_COLOR
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
