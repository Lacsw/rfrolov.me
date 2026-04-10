export type TNowItem = {
  label: string;
  value: string;
  detail?: string;
};

export type TNowData = {
  updated: string;
  items: TNowItem[];
};

export const nowData: TNowData = {
  updated: "2026-04-10",
  items: [
    {
      label: "Building",
      value: "Personal portfolio",
      detail: "Next.js 16 · Tailwind v4 · Framer Motion",
    },
    {
      label: "Reading",
      value: "The Internet of Money Vol 2",
      detail: "Andreas Antonopoulos",
    },
    {
      label: "Focus",
      value: "Frontend craft + micro-interactions",
    },
    {
      label: "Location",
      value: "Berlin, Germany",
    },
  ],
};
