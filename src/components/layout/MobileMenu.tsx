"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/ui";
import { HOVER_TEXT_COLOR, NAV_LINKS } from "@/constants";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./LanguageSwitcher";

type TMobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: TMobileMenuProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="mobile-menu-open fixed top-16 inset-x-0 z-40 sm:hidden">
          {/* Backdrop overlay for click-outside */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={onClose}
          />

          {/* Menu content */}
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden bg-background/95 backdrop-blur-sm border-b border-muted"
          >
            <ul className="flex flex-col py-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block px-6 py-3 text-base transition-colors duration-300",
                        isActive ? "text-foreground" : HOVER_TEXT_COLOR
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                );
              })}

              {/* Divider */}
              <li className="border-t border-muted my-2 mx-6" />

              {/* Controls */}
              <li className="flex items-center gap-4 px-6 py-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </li>
            </ul>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
