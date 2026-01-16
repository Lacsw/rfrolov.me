type TProjectHighlightProps = {
  highlight: string;
};

export function ProjectHighlight({ highlight }: TProjectHighlightProps) {
  return <p className="text-xs text-foreground/80 font-medium">✦ {highlight}</p>;
}
