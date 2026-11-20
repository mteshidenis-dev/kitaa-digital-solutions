import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalUrl, getPageMeta, OG_IMAGE } from "@/lib/seo";
import { activeSocialLinks, siteContact, SITE_URL } from "@/lib/site";

/** Find a head tag by selector, or create it, then set one attribute. */
const upsert = (selector: string, create: () => HTMLElement, attr: string, value: string) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const meta = (key: "name" | "property", id: string, content: string) =>
  upsert(
    `meta[${key}="${id}"]`,
    () => {
      const m = document.createElement("meta");
      m.setAttribute(key, id);
      return m;
    },
    "content",
    content,
  );

/** Business details for search engines, added on the homepage only. */
const businessJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Kitaa Digital Solutions",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: OG_IMAGE,
  email: siteContact.email,
  telephone: siteContact.phones.map((p) => p.href.replace("tel:", "")),
  address: {
    "@type": "PostalAddress",
    ...(siteContact.address ? { streetAddress: siteContact.address } : {}),
    addressLocality: "Arusha",
    addressCountry: "TZ",
  },
  areaServed: [
    { "@type": "Country", name: "Tanzania" },
    { "@type": "Place", name: "East Africa" },
  ],
  ...(activeSocialLinks().length ? { sameAs: activeSocialLinks().map((s) => s.url) } : {}),
});

/**
 * Keeps the document head in sync with the current route: title, description,
 * canonical URL, Open Graph / Twitter tags, robots, and homepage structured data.
 */
const RouteSeo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = getPageMeta(pathname);
    const url = canonicalUrl(pathname);

    document.title = m.title;
    meta("name", "description", m.description);
    meta("name", "robots", m.noindex ? "noindex, follow" : "index, follow");
    upsert(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      },
      "href",
      url,
    );

    meta("property", "og:type", "website");
    meta("property", "og:site_name", "Kitaa Digital Solutions");
    meta("property", "og:title", m.title);
    meta("property", "og:description", m.description);
    meta("property", "og:url", url);
    meta("property", "og:image", OG_IMAGE);
    // TODO: add meta("name", "twitter:site", "@handle") once Kitaa has an X/Twitter account.
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", m.title);
    meta("name", "twitter:description", m.description);
    meta("name", "twitter:image", OG_IMAGE);

    const existing = document.getElementById("business-jsonld");
    if (pathname === "/") {
      const el = existing ?? document.createElement("script");
      el.id = "business-jsonld";
      el.setAttribute("type", "application/ld+json");
      el.textContent = JSON.stringify(businessJsonLd());
      if (!existing) document.head.appendChild(el);
    } else existing?.remove();
  }, [pathname]);

  return null;
};

export default RouteSeo;
