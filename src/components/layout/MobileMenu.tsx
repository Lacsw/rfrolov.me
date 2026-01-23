"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ThemeToggle } from "@/components/ui";
import { ANIMATION_DURATION, createStaggerAnimation, HOVER_TEXT_COLOR } from "@/constants";
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
  const { container, item } = createStaggerAnimation({ offset: 30 });

  const navLinks = [
    { name: t("home"), href: "/" as const },
    { name: t("projects"), href: "/projects" as const },
    { name: t("blog"), href: "/blog" as const },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="mobile-menu-open fixed inset-0 z-40 bg-background sm:hidden">
          {/* Menu content */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: ANIMATION_DURATION.normal }}
            className="pt-16 h-full"
          >
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-col items-center justify-center gap-8 h-full"
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                return (
                  <motion.li key={link.href} variants={item}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "text-2xl transition-colors duration-300",
                        isActive ? "text-foreground" : HOVER_TEXT_COLOR
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}

              <motion.li variants={item} className="flex items-center gap-4 pt-4">
                <LanguageSwitcher />
                <ThemeToggle />
              </motion.li>
            </motion.ul>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
