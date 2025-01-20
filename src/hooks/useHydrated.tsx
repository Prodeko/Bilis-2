import { useEffect, useState } from "react";

/** Hook used to check when the javascript is running on the client. This is important when we use
 * server-side rendering. We might get bugs during hydration (React attaches event listeners to server-side generated html).
 * This hook is used to check when hydration is done and we can use client-sided code.
 *
 *
 * @returns boolean value that indicates if the hydration period is over
 */
const useHydrated = () => {
  const [isHydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return isHydrated;
};

export default useHydrated;
