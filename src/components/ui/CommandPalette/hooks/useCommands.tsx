import { useMemo } from "react";

import {
  BookOpen,
  Briefcase,
  FileText,
  FolderKanban,
  Home,
  Languages,
  Moon,
  Sun,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { ICON_SIZE } from "@/constants";
import { useCommandPalette } from "@/hooks";
import { defaultLocale, isLocale, TLocale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/routing";
import { TBlogPostMeta } from "@/types";

import { TCommand } from "../types";

export function useCommands(blogPosts: TBlogPostMeta[]) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const localeRaw = useLocale();
  const locale: TLocale = isLocale(localeRaw) ? localeRaw : defaultLocale;
  const { setTheme, resolvedTheme } = useTheme();
  const { close } = useCommandPalette();

  const isDark = resolvedTheme === "dark";
  const otherLocale = locale === "en" ? "de" : "en";

  const commands = useMemo<TCommand[]>(() => {
    const navCommands: TCommand[] = [
      {
        id: "home",
        label: t("nav.home"),
        icon: <Home className={ICON_SIZE.sm} />,
        action: () => {
          router.push("/");
          close();
        },
        group: "navigation",
      },
      {
        id: "experience",
        label: t("nav.experience"),
        icon: <Briefcase className={ICON_SIZE.sm} />,
        action: () => {
          router.push("/experience");
          close();
        },
        group: "navigation",
      },
      {
        id: "projects",
        label: t("nav.projects"),
        icon: <FolderKanban className={ICON_SIZE.sm} />,
        action: () => {
          router.push("/projects");
          close();
        },
        group: "navigation",
      },
      {
        id: "blog",
        label: t("nav.blog"),
        icon: <BookOpen className={ICON_SIZE.sm} />,
        action: () => {
          router.push("/blog");
          close();
        },
        group: "navigation",
      },
    ];

    const actionCommands: TCommand[] = [
      {
        id: "theme",
        label: isDark ? t("theme.switchToLight") : t("theme.switchToDark"),
        icon: isDark ? <Sun className={ICON_SIZE.sm} /> : <Moon className={ICON_SIZE.sm} />,
        shortcut: "T",
        shortcutHint: t("commandPalette.shortcutTheme"),
        action: () => {
          setTheme(isDark ? "light" : "dark");
          close();
        },
        group: "actions",
      },
      {
        id: "language",
        label: t("language.switchTo", { language: t(`language.${otherLocale}`) }),
        icon: <Languages className={ICON_SIZE.sm} />,
        shortcut: "L",
        shortcutHint: t("commandPalette.shortcutLanguage"),
        action: () => {
          router.replace(pathname, { locale: otherLocale });
          close();
        },
        group: "actions",
      },
    ];

    const blogCommands: TCommand[] = blogPosts.map((post) => ({
      id: `blog-${post.slug}`,
      label: post.title,
      icon: <FileText className={ICON_SIZE.sm} />,
      action: () => {
        router.push(`/blog/${post.slug}`);
        close();
      },
      group: "blog",
    }));

    return [...navCommands, ...actionCommands, ...blogCommands];
  }, [t, router, pathname, otherLocale, isDark, setTheme, close, blogPosts]);

  return commands;
}
