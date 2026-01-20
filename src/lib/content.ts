import fs from "fs";

import matter from "gray-matter";

type TParsedMDX = {
  data: Record<string, unknown>;
  content: string;
};

export function parseMDXFile(filePath: string): TParsedMDX {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return matter(fileContent);
}

export function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
