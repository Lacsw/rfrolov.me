"use client";

import { useTranslations } from "next-intl";

import { AnimatedSection, Container, SocialLink } from "@/components/ui";
import { EXTERNAL_LINK_PROPS } from "@/constants";
import { socialLinks } from "@/data/social-links";

export function Contact() {
  const t = useTranslations("contact");
  const linkedInUrl = socialLinks.find((link) => link.name === "LinkedIn")?.href;

  return (
    <section className="py-8 lg:py-12 border-t border-muted">
      <Container>
        <AnimatedSection className="flex items-center justify-between">
          {linkedInUrl ? (
            <a
              href={linkedInUrl}
              {...EXTERNAL_LINK_PROPS}
              className="text-lg font-semibold tracking-tight hover:text-muted-foreground transition-colors"
            >
              {t("getInTouch")}
            </a>
          ) : (
            <span className="text-lg font-semibold tracking-tight">{t("getInTouch")}</span>
          )}

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
