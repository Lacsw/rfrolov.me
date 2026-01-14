"use client";

import { CategoryBadge } from "@/components/ui/CategoryBadge";
import { Container } from "@/components/ui/Container";
import { ProjectHighlight } from "@/components/ui/ProjectHighlight";
import { TechTags } from "@/components/ui/TechTags";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

const featuredProjects = projects.filter((p) => p.featured);

export function FeaturedProjects() {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:opacity-70 transition-opacity cursor-pointer"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <motion.a
                key={project.id}
                href={project.href || project.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group block h-full rounded-lg border border-muted bg-background p-6 cursor-pointer transition-all duration-300 hover:border-muted-foreground/20 hover:shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CategoryBadge category={project.category} size="sm" />
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                      </div>
                      <h3 className="font-medium text-sm">{project.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {project.github && (
                        <Github className="h-4 w-4 text-muted-foreground" />
                      )}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs line-clamp-2">
                    {project.description}
                  </p>
                  {project.highlight && (
                    <ProjectHighlight highlight={project.highlight} />
                  )}
                  <TechTags
                    technologies={project.technologies}
                    limit={3}
                    size="sm"
                    className="pt-1"
                  />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
