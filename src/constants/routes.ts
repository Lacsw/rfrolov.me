export const STATIC_ROUTES = ["", "/blog", "/projects"] as const;

export type TStaticRoute = (typeof STATIC_ROUTES)[number];
