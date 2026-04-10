"use client";

import { useEffect, useRef } from "react";

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

const menuContainerVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: 0.2 },
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const },
      opacity: { duration: 0.15 },
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.15 },
  },
};

export function MobileMenu({ isOpen, onClose }: TMobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;

    if (!menu) return;

    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    };

    menu.addEventListener("keydown", handleKeyDown);

    return () => menu.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={tCommon("mobileMenu")}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuContainerVariants}
            className="relative overflow-hidden bg-background/95 backdrop-blur-sm border-b border-muted"
          >
            <ul className="flex flex-col py-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <motion.li key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block px-6 py-3 text-base transition-colors duration-300",
                        isActive ? "text-accent-foreground" : HOVER_TEXT_COLOR
                      )}
                    >
                      {t(link.key)}
                    </Link>
                  </motion.li>
                );
              })}

              {/* Divider */}
              <motion.li variants={linkVariants} className="border-t border-muted my-2 mx-6" />

              {/* Controls */}
              <motion.li variants={linkVariants} className="flex items-center gap-4 px-6 py-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </motion.li>
            </ul>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
