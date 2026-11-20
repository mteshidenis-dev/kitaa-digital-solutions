import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { recentProjects } from "@/lib/projects";
import { formatTZS, pricingCategories } from "@/lib/pricing";
import { canonicalUrl, getPageMeta } from "@/lib/seo";

const publicFile = (p: string) => resolve(__dirname, "../../public", p.replace(/^\//, ""));

describe("projects", () => {
  it("have unique slugs", () => {
    const slugs = recentProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("point to images and logos that exist in /public", () => {
    for (const p of recentProjects) {
      for (const file of [p.imageSrc, p.logoSrc, p.beforeImage, p.afterImage]) {
        if (file) expect(existsSync(publicFile(file)), `${p.slug}: ${file}`).toBe(true);
      }
    }
  });

  it("link to https sites", () => {
    for (const p of recentProjects) expect(p.url, p.slug).toMatch(/^https:\/\//);
  });

  it("each get their own page title and canonical URL", () => {
    for (const p of recentProjects) {
      expect(getPageMeta(`/portfolio/${p.slug}`).title, p.slug).toContain(p.name);
      expect(canonicalUrl(`/portfolio/${p.slug}`)).toMatch(/^https:\/\/kitaadigitalsolutions\.tech\/portfolio\//);
    }
  });

  it("are all listed in the sitemap", () => {
    const sitemap = readFileSync(publicFile("sitemap.xml"), "utf8");
    for (const p of recentProjects) expect(sitemap, p.slug).toContain(`/portfolio/${p.slug}<`);
  });
});

describe("pricing", () => {
  it("formats Tanzanian shillings", () => {
    expect(formatTZS(850000)).toBe("TZS 850,000");
  });

  it("has a name and a positive price for every plan", () => {
    for (const c of pricingCategories) {
      for (const plan of c.plans) {
        expect(plan.name).toBeTruthy();
        expect(plan.price, `${c.id}/${plan.name}`).toBeGreaterThan(0);
      }
    }
  });
});
