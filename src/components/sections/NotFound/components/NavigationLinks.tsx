import Link from "next/link";

import { ROUTES } from "../constants";

export function NavigationLinks() {
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {ROUTES.map((route) => (
        <Link
          key={route.path}
          href={route.path}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-muted hover:bg-muted/50 hover:border-foreground/20 transition-colors"
        >
          <span className="text-green-500">→</span>
          <span>cd {route.path}</span>
          <span className="text-muted-foreground">({route.label})</span>
        </Link>
      ))}
    </div>
  );
}
