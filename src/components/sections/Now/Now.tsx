"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SectionHeader } from "@/components/ui";
import { nowData } from "@/data/now";

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Now() {
  const t = useTranslations("now");
  const updated = new Date(nowData.updated);
  const formattedDate = updated.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="py-12 lg:py-16">
      <Container>
        <AnimatedSection className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <SectionHeader title={t("title")} />
            <span className="shrink-0 text-xs text-muted-foreground">
              {t("updated")} {formattedDate}
            </span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {nowData.items.map((item, index) => (
              <motion.li
                key={item.label}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={itemVariants}
                className="rounded-lg border border-muted bg-background p-4 transition-colors duration-300 hover:border-muted-foreground/30"
              >
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{item.value}</p>
                {item.detail && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                )}
              </motion.li>
            ))}
          </ul>
        </AnimatedSection>
      </Container>
    </section>
  );
}
