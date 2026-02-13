"use client";

import { useEffect, useState } from "react";

import { Command } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container, HamburgerIcon, ThemeToggle } from "@/components/ui";
import { HOVER_TEXT_COLOR, KBD_BASE, NAV_LINKS } from "@/constants";
import { useCommandPalette, useScrolled } from "@/hooks";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const scrolled = useScrolled(50);
  const { open: openCommandPalette } = useCommandPalette();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isMenuOpen
            ? "bg-background/80 backdrop-blur-sm border-b border-muted"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav className="flex items-center justify-between h-16">
            <Link href="/" aria-label={t("home")} className="font-semibold text-foreground">
              RF
            </Link>

            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-6">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map((link) => {
                  const isActive =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "text-sm transition-colors duration-300",
                          isActive ? "text-accent-foreground" : HOVER_TEXT_COLOR
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={openCommandPalette}
                aria-label={t("openCommandPalette")}
                className={cn(
                  KBD_BASE,
                  "hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-muted-foreground",
                  "cursor-pointer transition-colors hover:bg-muted hover:text-foreground"
                )}
              >
                <Command className="h-3 w-3" />
                <span>K</span>
              </button>
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2 cursor-pointer"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isMenuOpen}
            >
              <HamburgerIcon isOpen={isMenuOpen} />
            </button>
          </nav>
        </Container>
      </header>

      {/* Mobile menu - outside header to avoid fixed positioning issues */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
