import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

export function ProjectContent({ children }: TProps) {
  return <div className="prose-custom">{children}</div>;
}
