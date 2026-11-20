export const SITE_URL = "https://kitaadigitalsolutions.tech";

/** Year the studio started. Used for "Building since" and "years" stats. TODO: owner to confirm. */
export const FOUNDED_YEAR = 2019;
export const yearsInBusiness = () => new Date().getFullYear() - FOUNDED_YEAR;

/** Set to true when the blog has real articles; it then reappears in the menu, footer and sitemap. */
export const SHOW_BLOG = false;

/** WhatsApp line used by every "WhatsApp us" button on the site. */
const whatsappNumber = "255763346078";
const defaultWhatsappMessage = "Hi Kitaa, I found you on your website and I'd like to talk about a project.";

/** WhatsApp chat link with a pre-filled message. */
export const whatsappLink = (message: string = defaultWhatsappMessage) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

export const siteContact = {
  email: "info@kitaadigitalsolutions.tech",
  location: "Arusha, Tanzania",
  /** TODO: street address (shown on /contact and in structured data once filled in). */
  address: "",
  whatsapp: {
    display: "+255 763 346 078",
    href: whatsappLink(),
  },
  phones: [
    {
      label: "Phone",
      display: "+255 759 352 572",
      href: "tel:+255759352572",
      note: "Calls, business hours",
    },
    {
      label: "WhatsApp",
      display: "+255 763 346 078",
      href: "tel:+255763346078",
      note: "WhatsApp and calls",
    },
  ],
};

/**
 * Social profiles. Only entries with a URL are shown on the site, so
 * nothing broken goes live. TODO: add the real profile URLs.
 */
export const socialLinks: {
  name: "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "X";
  url: string;
  /** Accessible label; defaults to "Kitaa on <name>". */
  label?: string;
}[] = [
  { name: "Instagram", url: "" }, // TODO: e.g. https://www.instagram.com/<handle>
  { name: "Facebook", url: "" }, // TODO: e.g. https://www.facebook.com/<page>
  { name: "TikTok", url: "https://www.tiktok.com/@kitaa.graphix" },
  // Personal profile of co-founder Denis Mteshi. TODO: swap for a company page if one is created.
  { name: "LinkedIn", url: "https://www.linkedin.com/in/denis-mteshi-42b7ab365", label: "Denis Mteshi, co-founder, on LinkedIn" },
  { name: "X", url: "" }, // TODO: optional, e.g. https://x.com/<handle>
];

export const activeSocialLinks = () => socialLinks.filter((s) => s.url);

export const legalMeta = {
  effectiveDate: "9 March 2026",
  governingLaw: "United Republic of Tanzania",
};
