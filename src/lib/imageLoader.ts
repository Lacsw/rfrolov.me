import type { ImageLoaderProps } from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function imageLoader({ src }: ImageLoaderProps): string {
  return `${basePath}${src}`;
}
