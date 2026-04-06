import { Metadata } from "next";

import { notFound } from "next/navigation";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { ReadingsList } from "@/components/sections/Readings";
import { SITE_URL } from "@/constants";
import { isLocale, locales } from "@/i18n/config";
import { getBooksByYear, getCurrentlyReading } from "@/lib/readings";

type TProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "metadata" });
  const url = `${SITE_URL}/${locale}/readings`;

  return {
    title: t("readingsTitle"),
    description: t("readingsDescription"),
    openGraph: {
      title: t("readingsTitle"),
      description: t("readingsDescription"),
      url,
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ReadingsPage({ params }: TProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam;
  setRequestLocale(locale);

  const booksByYear = [...getBooksByYear().entries()];
  const currentlyReading = getCurrentlyReading();

  return (
    <main className="pt-16">
      <ReadingsList booksByYear={booksByYear} currentlyReading={currentlyReading} />
    </main>
  );
}
