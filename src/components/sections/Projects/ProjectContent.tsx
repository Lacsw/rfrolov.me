import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export function ProjectContent({ children }: TProps) {
  return <article className="prose-project">{children}</article>;
}
