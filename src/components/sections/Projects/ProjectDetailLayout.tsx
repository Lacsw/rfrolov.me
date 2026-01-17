"use client";

import { ReactNode } from "react";

import { motion } from "framer-motion";

import { Container } from "@/components/ui";
import { ANIMATION_DURATION } from "@/constants";
import { TProject, TProjectDetailMeta } from "@/types";

import { ProjectHero } from "./ProjectHero";
import { ProjectMeta } from "./ProjectMeta";
import { RelatedProjects } from "./RelatedProjects";

type TProps = {
  project: TProjectDetailMeta;
  relatedProjects: TProject[];
  children: ReactNode;
};

export function ProjectDetailLayout({ project, relatedProjects, children }: TProps) {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-10 xl:grid-cols-[1fr_250px]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.slower }}
            className="max-w-2xl space-y-8"
          >
            <ProjectHero project={project} />

            <hr className="border-muted" />

            {children}

            <RelatedProjects projects={relatedProjects} />
          </motion.article>

          <aside className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: ANIMATION_DURATION.slower, delay: 0.2 }}
              className="sticky top-24"
            >
              <ProjectMeta project={project} />
            </motion.div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
