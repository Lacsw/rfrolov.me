"use client";

import { Container } from "@/components/ui/Container";
import { SocialLink } from "@/components/ui/SocialLink";
import { socialLinks } from "@/data/social-links";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-20 lg:pt-40 lg:pb-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <p className="text-muted-foreground">Hi, my name is</p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Roman Frolov
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground">
            Frontend Developer
          </p>

          <p className="max-w-lg text-muted-foreground leading-relaxed">
            I build exceptional digital experiences with modern web
            technologies. Focused on creating clean, performant, and accessible
            interfaces.
          </p>

          <motion.div
            className="flex gap-5 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {socialLinks.map((link) => (
              <SocialLink key={link.name} {...link} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
