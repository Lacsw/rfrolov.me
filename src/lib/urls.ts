export function getTagUrl(tag: string): string {
  return `/blog/tags/${tag.toLowerCase()}`;
}
