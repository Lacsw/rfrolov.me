import { ImageResponse } from "next/og";

import { TLocale } from "@/i18n/config";
import { getProjectById } from "@/lib/projects";

export const alt = "Project";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type TProps = {
  params: Promise<{ id: string; locale: string }>;
};

export default async function Image({ params }: TProps) {
  const { id, locale } = await params;
  const project = getProjectById(id, locale as TLocale);

  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#fafafa",
            fontFamily: "monospace",
          }}
        >
          <span style={{ fontSize: 48 }}>Project not found</span>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "monospace",
          padding: 60,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              color: "#a1a1aa",
              fontSize: 24,
            }}
          >
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                style={{
                  backgroundColor: "#27272a",
                  padding: "8px 16px",
                  borderRadius: 8,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.2,
              marginTop: 24,
              maxWidth: "90%",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              marginTop: 16,
              maxWidth: "80%",
              lineHeight: 1.4,
            }}
          >
            {project.longDescription || project.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#71717a",
            fontSize: 24,
          }}
        >
          <span>rfrolov.me</span>
          <span>{project.year}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
