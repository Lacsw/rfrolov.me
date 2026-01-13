"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { experiences } from "@/data/experience";
import { ExperienceCard } from "./components";
import { EXPERIENCE_ANIMATION } from "./constants";

export function Experience() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-lg font-semibold tracking-tight">Experience</h2>

          <motion.div
            variants={EXPERIENCE_ANIMATION.container}
            initial="hidden"
            animate="show"
          >
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
