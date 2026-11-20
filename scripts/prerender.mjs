/**
 * Pre-renders every route in the sitemap to static HTML after `vite build`,
 * so crawlers and link previews (WhatsApp, Facebook, LinkedIn) get real content
 * and each page's own <title>, description, canonical and Open Graph tags.
 *
 * Output (inside dist/):
 *   index.html               homepage, pre-rendered
 *   app-shell.html           the original empty shell, used as the SPA fallback
 *   _pages/<route>.html      every other route, e.g. _pages/pricing.html
 * public/.htaccess serves _pages/<route>.html for matching URLs.
 *
 * Browser: system Chrome by default (present on GitHub Actions runners).
 * Locally on Windows: PRERENDER_CHANNEL=msedge node scripts/prerender.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { preview } from "vite";
import { chromium } from "playwright-core";
import { getRoutes } from "./generate-sitemap.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const channel = process.env.PRERENDER_CHANNEL || "chrome";

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error("dist/index.html not found. Run `vite build` first.");
  process.exit(1);
}

// Keep the untouched shell as the fallback for routes we don't pre-render (e.g. 404s).
fs.copyFileSync(path.join(dist, "index.html"), path.join(dist, "app-shell.html"));

const server = await preview({ root, logLevel: "error", preview: { port: 4179, strictPort: true } });
const base = "http://localhost:4179";
const browser = await chromium.launch({ channel });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

// Homepage last: it overwrites index.html, which the preview server uses as its fallback.
const routes = [...getRoutes().filter((r) => r !== "/"), "/"];
let failures = 0;

for (const route of routes) {
  try {
    await page.goto(base + route, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForSelector("h1", { timeout: 20000 });
    await page.waitForTimeout(600); // let entrance animations and head updates settle

    const html = await page.evaluate(() => {
      // Remove things that only make sense in a live browser session.
      document.querySelectorAll("canvas").forEach((c) => c.remove());
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
      document.documentElement.removeAttribute("style");
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });

    // Sanity checks: the page must carry its own canonical and a real heading.
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const expected = route === "/" ? "https://kitaadigitalsolutions.tech/" : `https://kitaadigitalsolutions.tech${route}`;
    if (canonical !== expected) throw new Error(`canonical is ${canonical}, expected ${expected}`);

    const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, "_pages", `${route.slice(1)}.html`);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`prerendered ${route}`);
  } catch (err) {
    failures++;
    console.error(`FAILED ${route}: ${err.message}`);
  }
}

await browser.close();
await new Promise((r) => server.httpServer.close(r));

if (failures) {
  console.error(`${failures} route(s) failed to pre-render`);
  process.exit(1);
}
console.log(`Pre-rendered ${routes.length} routes.`);
