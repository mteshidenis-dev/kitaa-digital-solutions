import { lazy, type ComponentType } from "react";

const RELOAD_KEY = "kitaa-chunk-reload";

/**
 * React.lazy with recovery after a deploy: if a tab was opened before a new
 * version went live, its page files no longer exist on the server. Instead of a
 * blank screen, reload once to pick up the current version.
 */
export const lazyPage = <T extends ComponentType<unknown>>(load: () => Promise<{ default: T }>) =>
  lazy(async () => {
    try {
      const mod = await load();
      try {
        sessionStorage.removeItem(RELOAD_KEY);
      } catch {
        /* storage unavailable */
      }
      return mod;
    } catch (err) {
      let alreadyReloaded = false;
      try {
        alreadyReloaded = sessionStorage.getItem(RELOAD_KEY) === "1";
        if (!alreadyReloaded) sessionStorage.setItem(RELOAD_KEY, "1");
      } catch {
        /* storage unavailable: still try one reload */
      }
      if (!alreadyReloaded) {
        window.location.reload();
        return new Promise<{ default: T }>(() => {}); // keep the blank fallback until the reload happens
      }
      throw err;
    }
  });
