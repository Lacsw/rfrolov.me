export const STATIC_ROUTES = ["", "/blog", "/projects"] as const;

export type TStaticRoute = (typeof STATIC_ROUTES)[number];

export const NAV_LINKS = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
] as const;

export type TNavLink = (typeof NAV_LINKS)[number];
