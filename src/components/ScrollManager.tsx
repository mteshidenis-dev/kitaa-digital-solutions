import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * ScrollManager
 *
 * - PUSH / REPLACE navigation  → scrolls to (0, 0) immediately
 * - POP (back / forward)       → restores the scroll position that was saved
 *                                 for that history entry
 *
 * Scroll positions are persisted into the history state object so they
 * survive full page reloads and cross-session navigation.
 */
export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();

  // Disable the browser's own scroll restoration so we own it entirely.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Continuously write the current Y offset into the active history entry
  // so it is available when the user navigates back to this page.
  useEffect(() => {
    const saveScroll = () => {
      const state = window.history.state ?? {};
      window.history.replaceState({ ...state, _scrollY: window.scrollY }, "");
    };
    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => window.removeEventListener("scroll", saveScroll);
  }, []);

  // React to every route change.
  useEffect(() => {
    if (navType === "POP") {
      // Restore the saved position for this history entry.
      const y =
        (window.history.state as { _scrollY?: number } | null)?._scrollY ?? 0;
      // rAF ensures the route's DOM has painted before we jump.
      requestAnimationFrame(() =>
        window.scrollTo({ top: y, behavior: "instant" })
      );
    } else {
      // New page — always start at the top.
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    // location.key is unique per history entry (changes on every navigation).
  }, [location.key, navType]);

  return null;
}
