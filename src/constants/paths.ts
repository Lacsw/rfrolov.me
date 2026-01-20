import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export const CONTENT_PATHS = {
  blog: path.join(CONTENT_DIR, "blog"),
  projects: path.join(CONTENT_DIR, "projects"),
} as const;
