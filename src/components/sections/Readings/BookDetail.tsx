"use client";

import { ReactNode } from "react";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";

import { BackLink, Container, Tag } from "@/components/ui";
import { ANIMATION_DURATION, TEXT_SIZE } from "@/constants";
import { cn } from "@/lib/utils";
import { TBook } from "@/types";

type TProps = {
  book: TBook;
  children: ReactNode;
};

export function BookDetail({ book, children }: TProps) {
  const t = useTranslations("readings");

  const date = new Date(book.dateRead + "-01");
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.slower }}
          className="max-w-2xl space-y-8"
        >
          <BackLink href="/readings">{t("backToReadings")}</BackLink>

          <header className="flex gap-6">
            <div className="relative h-[220px] w-[150px] flex-shrink-0 overflow-hidden rounded">
              <Image
                src={book.cover}
                alt={`${book.title} cover`}
                fill
                className="object-cover"
                sizes="150px"
              />
            </div>
            <div className="space-y-3">
              <h1 className={cn("font-semibold tracking-tight", TEXT_SIZE.title)}>{book.title}</h1>
              <p className="text-muted-foreground">{book.author}</p>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
              <div className="flex flex-wrap gap-1.5">
                {book.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </header>

          <p className="text-muted-foreground">{book.description}</p>

          <hr className="border-muted" />

          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {t("myThoughts")}
            </p>
            <div className="prose-custom">{children}</div>
          </div>
        </motion.article>
      </Container>
    </section>
  );
}
