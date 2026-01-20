import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider, ThemeProvider } from "@/components/providers";
import { ScrollToTop, ToastProvider } from "@/components/ui";
import { routing } from "@/i18n/routing";

type TProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://rfrolov.me"),
    title: t("title"),
    description: t("description"),
    keywords: ["frontend developer", "React", "TypeScript", "web development"],
    authors: [{ name: "Roman Frolov" }],
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://rfrolov.me",
      siteName: "Roman Frolov",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://rfrolov.me/${locale}`,
      languages: {
        en: "https://rfrolov.me/en",
        de: "https://rfrolov.me/de",
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: TProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LanguageProvider>
        <ThemeProvider>
          <ToastProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-foreground focus:ring-offset-2"
            >
              Skip to content
            </a>
            <Navbar />
            <div id="main-content">{children}</div>
            <ScrollToTop />
          </ToastProvider>
        </ThemeProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}
