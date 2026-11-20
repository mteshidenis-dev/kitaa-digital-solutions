/**
 * Site audit: opens every route in a real browser (desktop and mobile) against
 * the production build and reports console errors, failed requests, broken
 * internal links and missing images. Optionally checks external links too.
 *
 *   npm run build && node scripts/audit-site.mjs [--external]
 *   (locally: set PRERENDER_CHANNEL=msedge)
 */
import path from "path";
import { fileURLToPath } from "url";
import { preview } from "vite";
import { chromium } from "playwright-core";
import { getRoutes } from "./generate-sitemap.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const channel = process.env.PRERENDER_CHANNEL || "chrome";
const checkExternal = process.argv.includes("--external");
const PORT = 4181;
const BASE = `http://localhost:${PORT}`;

// Routes that are not in the sitemap but should still work.
const extraRoutes = ["/portfolio/elbethel-stationary"];

const server = await preview({ root, logLevel: "error", preview: { port: PORT, strictPort: true } });
const browser = await chromium.launch({ channel });

const problems = [];
const internalLinks = new Map(); // path -> first page that links to it
const externalLinks = new Map();
const report = (page, msg) => problems.push(`${page}: ${msg}`);

const routes = [...new Set([...getRoutes(), ...extraRoutes])];

for (const viewport of [
  { name: "desktop", width: 1366, height: 900 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport, isMobile: viewport.name === "mobile" });
  for (const route of routes) {
    const page = await context.newPage();
    const label = `[${viewport.name}] ${route}`;
    page.on("console", (m) => {
      if (m.type() === "error") report(label, `console error: ${m.text().slice(0, 200)}`);
    });
    page.on("pageerror", (e) => report(label, `page error: ${e.message.slice(0, 200)}`));
    page.on("requestfailed", (r) => {
      const url = r.url();
      if (url.startsWith(BASE)) report(label, `request failed: ${url.replace(BASE, "")}`);
    });
    page.on("response", (r) => {
      const url = r.url();
      if (url.startsWith(BASE) && r.status() >= 400 && !url.endsWith(route))
        report(label, `HTTP ${r.status()}: ${url.replace(BASE, "")}`);
    });

    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Scroll through the page so lazy images and scroll animations load.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(400);

    const data = await page.evaluate(() => ({
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")),
      emptyLinks: [...document.querySelectorAll("a[href]")]
        .filter((a) => !a.textContent.trim() && !a.getAttribute("aria-label") && !a.querySelector("img[alt]"))
        .map((a) => a.getAttribute("href")),
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    }));

    for (const src of data.brokenImages) report(label, `broken image: ${src}`);
    for (const href of data.emptyLinks) report(label, `link with no text or label: ${href}`);
    if (data.overflowX) report(label, "page scrolls sideways (horizontal overflow)");

    for (const href of data.links) {
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (href.startsWith("/")) {
        const clean = href.split("#")[0].split("?")[0] || "/";
        if (!internalLinks.has(clean)) internalLinks.set(clean, route);
      } else if (/^https?:/.test(href) && !href.startsWith(BASE)) {
        if (!externalLinks.has(href)) externalLinks.set(href, route);
      }
    }
    await page.close();
  }
  await context.close();
}

// Every internal link must lead to a real page (not the "page not found" screen) or a real file.
const context = await browser.newContext();
const page = await context.newPage();
for (const [href, from] of internalLinks) {
  const res = await page.goto(BASE + href, { waitUntil: "networkidle" });
  if (!res || res.status() >= 400) {
    report(from, `broken internal link: ${href} (HTTP ${res?.status()})`);
    continue;
  }
  const notFound = await page.evaluate(() => /page not found|404/i.test(document.title + " " + (document.querySelector("h1")?.textContent ?? "")));
  if (notFound) report(from, `internal link goes to the "not found" page: ${href}`);
}
await context.close();

if (checkExternal) {
  for (const [href, from] of externalLinks) {
    let status;
    try {
      let res = await fetch(href, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) });
      if (res.status === 405 || res.status === 403) res = await fetch(href, { redirect: "follow", signal: AbortSignal.timeout(15000) });
      status = res.status;
    } catch (e) {
      status = e.cause?.code || e.name;
    }
    // Social networks often block automated checks (999, 403, 429); list them separately.
    const blocked = [403, 429, 999].includes(status);
    if (typeof status !== "number" || (status >= 400 && !blocked)) report(from, `broken external link: ${href} (${status})`);
    else if (blocked) console.log(`  (could not verify automatically, HTTP ${status}): ${href}`);
  }
}

await browser.close();
await new Promise((r) => server.httpServer.close(r));

console.log(`Checked ${routes.length} routes x 2 viewports, ${internalLinks.size} internal links${checkExternal ? `, ${externalLinks.size} external links` : ""}.`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of [...new Set(problems)]) console.log("  - " + p);
  process.exit(1);
}
console.log("No problems found.");
