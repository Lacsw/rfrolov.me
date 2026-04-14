import { useEffect, useState } from "react";

/**
 * Returns `false` on the server and during the first client render, `true`
 * after `useEffect` flushes post-mount. Use it to gate any rendering that
 * would otherwise produce different markup server-side vs. client-side — the
 * most common case is Framer Motion's `motion.*` wrappers, which emit an
 * inline style attribute on the client that SSR omits.
 *
 * Usage:
 *   const hydrated = useHydrated();
 *   return hydrated ? <motion.div {...animation} /> : <div />;
 *
 * This is the single mount-gate hook in the codebase. Do not add a parallel
 * `useHasMounted` / `useIsMounted`; reuse this one.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
