"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Container, SocialLink } from "@/components/ui";
import { socialLinks } from "@/data/social-links";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="py-8 lg:py-12 border-t border-muted">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <a
            href="https://www.linkedin.com/in/r-frolov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold tracking-tight hover:text-muted-foreground transition-colors"
          >
            {t("getInTouch")}
          </a>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
