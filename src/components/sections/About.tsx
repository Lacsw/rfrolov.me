"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export function About() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center py-20 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed max-w-2xl">
            <p>
              I&apos;m a frontend developer passionate about creating clean,
              performant, and accessible web applications. With expertise in
              React, TypeScript, and modern CSS, I focus on delivering
              exceptional user experiences.
            </p>
            <p>
              Currently, I&apos;m focused on building responsive and intuitive
              interfaces that bridge the gap between design and functionality.
              I believe in writing maintainable code and staying up-to-date with
              the latest web technologies.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
