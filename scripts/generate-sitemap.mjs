/**
 * Writes public/sitemap.xml from the site's routes and project list, so it
 * never drifts out of sync. Runs automatically before every build.
 * Also exports the route list for the pre-renderer.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://kitaadigitalsolutions.tech";

const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

export function getRoutes() {
  const showBlog = /export const SHOW_BLOG = true/.test(read("src/lib/site.ts"));
  const slugs = [...read("src/lib/projects.ts").matchAll(/^\s*slug: "([^"]+)",/gm)].map((m) => m[1]);
  return [
    "/",
    "/services",
    "/services/websites",
    "/services/applications",
    "/services/systems",
    "/services/graphics",
    "/services/social-media",
    "/portfolio",
    "/pricing",
    "/about",
    "/contact",
    ...(showBlog ? ["/blog"] : []),
    "/privacy",
    "/terms",
    ...slugs.map((s) => `/portfolio/${s}`),
  ];
}

const priority = (r) =>
  r === "/" ? "1.0" : ["/services", "/portfolio", "/pricing"].includes(r) ? "0.9" : r.startsWith("/services/") || r === "/contact" ? "0.8" : r.startsWith("/portfolio/") || r === "/about" ? "0.7" : "0.3";

export function writeSitemap() {
  const routes = getRoutes();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url>\n    <loc>${SITE}${r === "/" ? "/" : r}</loc>\n    <priority>${priority(r)}</priority>\n  </url>`).join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
  return routes;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const routes = writeSitemap();
  console.log(`sitemap.xml: ${routes.length} URLs`);
}
