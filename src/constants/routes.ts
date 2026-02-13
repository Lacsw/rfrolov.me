export const STATIC_ROUTES = ["", "/experience", "/blog", "/projects"] as const;

export type TStaticRoute = (typeof STATIC_ROUTES)[number];

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "blog", href: "/blog" },
  { key: "experience", href: "/experience" },
  { key: "projects", href: "/projects" },
] as const;

export type TNavLink = (typeof NAV_LINKS)[number];
