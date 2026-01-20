import path from "path";

import { CONTENT_PATHS } from "@/constants";
import { getProjects } from "@/data/projects";
import { TLocale } from "@/i18n/config";
import { TProject, TProjectDetail, TProjectDetailMeta } from "@/types";

import { fileExists, parseMDXFile } from "./content";

function getProjectFilePath(id: string, locale: TLocale): string {
  return path.join(CONTENT_PATHS.projects, `${id}.${locale}.mdx`);
}

export function hasProjectDetail(id: string, locale: TLocale): boolean {
  return fileExists(getProjectFilePath(id, locale));
}

export function getProjectById(id: string, locale: TLocale): TProjectDetail | null {
  const projects = getProjects(locale);
  const baseProject = projects.find((p) => p.id === id);

  if (!baseProject) {
    return null;
  }

  const filePath = getProjectFilePath(id, locale);

  if (!fileExists(filePath)) {
    return null;
  }

  const { data, content } = parseMDXFile(filePath);

  return {
    ...baseProject,
    longDescription: data.longDescription as string,
    role: data.role as string,
    duration: data.duration as string,
    team: data.team as string,
    screenshots: (data.screenshots as TProjectDetail["screenshots"]) || [],
    content,
  };
}

export function getAllProjectsWithContent(locale: TLocale): TProjectDetailMeta[] {
  const projects = getProjects(locale);

  return projects
    .filter((project) => hasProjectDetail(project.id, locale))
    .map((project) => {
      const detail = getProjectById(project.id, locale);

      if (!detail) {
        return project as TProjectDetailMeta;
      }

      const { content: _, ...meta } = detail;

      return meta;
    });
}

export function getAllProjectIdsWithContent(locale: TLocale): string[] {
  return getAllProjectsWithContent(locale).map((project) => project.id);
}

export function getRelatedProjects(
  currentProject: TProject,
  locale: TLocale,
  limit = 3
): TProject[] {
  const projects = getProjects(locale);
  const currentTechLower = currentProject.technologies.map((t) => t.toLowerCase());

  const scoredProjects = projects
    .filter((project) => project.id !== currentProject.id && hasProjectDetail(project.id, locale))
    .map((project) => {
      const sharedTechnologies = project.technologies.filter((tech) =>
        currentTechLower.includes(tech.toLowerCase())
      );

      return {
        project,
        score: sharedTechnologies.length,
      };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredProjects.slice(0, limit).map(({ project }) => project);
}
