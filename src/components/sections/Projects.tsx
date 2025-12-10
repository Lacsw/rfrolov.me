"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Projects() {
  return (
    <section className="min-h-[calc(100vh-4rem)] py-20 lg:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>

          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card hover>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{project.title}</h3>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
