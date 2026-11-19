/*
 * Kitaa pricing, in Tanzanian shillings.
 *
 * Positioned from market research (Nov 2026) of 30+ Tanzanian agencies and
 * freelancers: above Jiji/freelancer rates, below corporate agencies, and filling
 * gaps nobody publishes (e.g. 550k–1.1M/month social media, 850k brand packages).
 * Change a number here and the Pricing page updates everywhere.
 */

/** Approximate USD rate used only for the "≈ US$" hint (Bank of Tanzania, Nov 2026). */
export const USD_RATE = 2645;

export type Billing = "one-time" | "month" | "year";

export type Plan = {
  name: string;
  tagline: string;
  price: number; // TZS
  from?: boolean; // shows "From" before the price
  billing: Billing;
  delivery?: string;
  popular?: boolean;
  features: string[];
};

export type PricingCategory = {
  id: string;
  label: string;
  need: string; // pre-selects the topic in the brief form
  intro: string;
  plans: Plan[];
  note?: string;
};

export const pricingCategories: PricingCategory[] = [
  {
    id: "websites",
    label: "Websites",
    need: "Website",
    intro: "Custom-designed websites, never templates. Grow and Signature include your domain, hosting and business emails for the first year.",
    plans: [
      {
        name: "Launch",
        tagline: "For new businesses that need a professional presence fast.",
        price: 850_000,
        billing: "one-time",
        delivery: "About 7 days",
        features: [
          "Up to 5 custom-designed pages",
          "Mobile-friendly and fast",
          "WhatsApp chat button and contact form",
          "Google Maps and basic SEO",
          "Domain, hosting and email not included (TZS 150,000 per year)",
          "2 rounds of design changes",
          "1 month of free support",
        ],
      },
      {
        name: "Grow",
        tagline: "For established businesses that want enquiries, not just a page.",
        price: 1_500_000,
        billing: "one-time",
        delivery: "About 14 days",
        popular: true,
        features: [
          "Up to 12 custom-designed pages",
          "Edit text and images yourself (CMS)",
          "Blog or news section",
          "Google Business Profile setup",
          "Google Analytics and Search Console",
          "Free domain, hosting and 10 emails for 1 year",
          "3 rounds of design changes",
          "2 months of free support",
        ],
      },
      {
        name: "Signature",
        tagline: "For tour operators, hotels and shops that sell or take bookings online.",
        price: 2_500_000,
        from: true,
        billing: "one-time",
        delivery: "About 30 days",
        features: [
          "Unlimited pages",
          "Online booking or e-commerce",
          "English and Swahili versions",
          "Copywriting for your key pages",
          "GA4 and Meta Pixel tracking",
          "Free domain, hosting and unlimited emails for 1 year",
          "3 months of free support and staff training",
        ],
      },
    ],
    note: "Domain, hosting and emails cost TZS 150,000 per year: from the start on Launch, and from year 2 on Grow and Signature.",
  },
  {
    id: "systems",
    label: "Systems & Apps",
    need: "Business system",
    intro: "Custom web apps and business systems that replace spreadsheets and paperwork. Priced after a free discovery call, with these as starting points.",
    plans: [
      {
        name: "Essential",
        tagline: "One process, done properly, e.g. stock, invoicing or bookings.",
        price: 2_500_000,
        from: true,
        billing: "one-time",
        delivery: "3–5 weeks",
        features: [
          "One core module built around your workflow",
          "Staff logins with roles and permissions",
          "Dashboard with PDF and Excel reports",
          "Works on phone, tablet and computer",
          "Hosting for 1 year",
          "Team training",
          "3 months of free support",
        ],
      },
      {
        name: "Business",
        tagline: "Several connected modules for a growing team.",
        price: 6_000_000,
        from: true,
        billing: "one-time",
        delivery: "6–10 weeks",
        popular: true,
        features: [
          "Up to 4 connected modules",
          "Mobile money payments",
          "SMS or WhatsApp notifications",
          "Analytics dashboard for owners",
          "Automatic daily backups",
          "Hosting for 1 year",
          "6 months of free support",
        ],
      },
      {
        name: "Enterprise",
        tagline: "Multi-branch operations, accounting, HR and payroll.",
        price: 15_000_000,
        from: true,
        billing: "one-time",
        delivery: "Quoted per project",
        features: [
          "Multi-branch and multi-user",
          "Accounting, HR or payroll modules",
          "Integrations with your existing tools",
          "Dedicated project lead",
          "Staged rollout and data migration",
          "Service-level support agreement",
        ],
      },
    ],
    note: "Systems are paid in milestones as each stage is delivered.",
  },
  {
    id: "branding",
    label: "Branding",
    need: "Branding",
    intro: "Logos and brand identities designed from your business strategy, so you look consistent and established everywhere.",
    plans: [
      {
        name: "Logo",
        tagline: "A professional logo for a new or refreshed business.",
        price: 250_000,
        billing: "one-time",
        delivery: "About 5 days",
        features: [
          "3 logo concepts to choose from",
          "2 rounds of changes",
          "Colour, black and white versions",
          "All files: PNG, SVG and PDF",
          "Social media profile kit",
        ],
      },
      {
        name: "Identity",
        tagline: "A complete, consistent look for your business.",
        price: 850_000,
        billing: "one-time",
        delivery: "About 2 weeks",
        popular: true,
        features: [
          "Everything in Logo",
          "Colour palette and typography",
          "Mini brand guide (PDF)",
          "Business card, letterhead and email signature",
          "10 social media post templates",
          "3 rounds of changes",
        ],
      },
      {
        name: "Brand + Profile",
        tagline: "For companies pitching to clients, funders and partners.",
        price: 1_800_000,
        from: true,
        billing: "one-time",
        delivery: "3–4 weeks",
        features: [
          "Everything in Identity",
          "Company profile, up to 12 pages",
          "2 flyers or posters",
          "Presentation (slides) template",
          "Full brand guidelines",
          "Unlimited changes on concepts",
        ],
      },
    ],
  },
  {
    id: "social",
    label: "Social Media",
    need: "Social media",
    intro: "Monthly social media management with designed posts and Swahili or English captions. Ad spend is always paid separately, directly to the platform.",
    plans: [
      {
        name: "Starter",
        tagline: "Stay active and consistent on the platforms that matter.",
        price: 250_000,
        billing: "month",
        features: [
          "2 platforms (e.g. Facebook and Instagram)",
          "8 designed posts per month",
          "Swahili or English captions",
          "Monthly content calendar",
          "Monthly performance report",
        ],
      },
      {
        name: "Growth",
        tagline: "Grow your audience and turn followers into customers.",
        price: 550_000,
        billing: "month",
        popular: true,
        features: [
          "3 platforms",
          "12 designed posts + 2 reels per month",
          "Replies to comments and messages on business days",
          "Paid ads setup and management",
          "Monthly report and strategy call",
        ],
      },
      {
        name: "Premium",
        tagline: "A full social team for busy, ambitious brands.",
        price: 1_100_000,
        billing: "month",
        features: [
          "Up to 4 platforms, incl. TikTok or LinkedIn",
          "20 designed posts + 4 reels per month",
          "Daily community management",
          "Paid ads management and optimisation",
          "Reports every 2 weeks",
          "Dedicated account manager",
        ],
      },
    ],
    note: "No long contracts: cancel with 30 days' notice. Photo and video shoots are quoted separately.",
  },
  {
    id: "care",
    label: "Care & SEO",
    need: "Website",
    intro: "Keep your website safe, up to date and found on Google after launch.",
    plans: [
      {
        name: "Basic Care",
        tagline: "Peace of mind that your site stays safe and online.",
        price: 50_000,
        billing: "month",
        features: [
          "Security and software updates",
          "Weekly backups",
          "Uptime monitoring",
          "Fixes if anything breaks",
          "Support on WhatsApp",
        ],
      },
      {
        name: "Growth Care",
        tagline: "For sites that change often and need to perform.",
        price: 150_000,
        billing: "month",
        popular: true,
        features: [
          "Everything in Basic Care",
          "Up to 4 content updates per month",
          "Speed and performance checks",
          "Monthly traffic report",
          "Priority support",
        ],
      },
      {
        name: "Local SEO",
        tagline: "Get found on Google by customers near you.",
        price: 400_000,
        billing: "month",
        features: [
          "Technical SEO audit and fixes",
          "Up to 10 pages optimised",
          "Google Business Profile management",
          "2 articles per month",
          "Monthly ranking report",
        ],
      },
    ],
    note: "Pay any care plan yearly and get 2 months free.",
  },
];

export const addOns: { name: string; price: number; unit?: string }[] = [
  { name: "Extra website page", price: 50_000, unit: "per page" },
  { name: "Mobile money payment integration", price: 400_000 },
  { name: "Swahili version of your website", price: 300_000, unit: "from" },
  { name: "Copywriting", price: 40_000, unit: "per page" },
  { name: "Google Business Profile setup", price: 80_000 },
  { name: "Flyer or poster design", price: 40_000, unit: "each" },
  { name: "Company profile design", price: 450_000, unit: "up to 12 pages" },
  { name: "Product uploads for online shops", price: 100_000, unit: "per 50 products" },
];

export const formatTZS = (n: number) => `TZS ${n.toLocaleString("en-US")}`;

/** Rounded USD hint, e.g. 650,000 → "≈ US$245". */
export const formatUSD = (n: number) => {
  const usd = n / USD_RATE;
  const rounded = usd >= 1000 ? Math.round(usd / 50) * 50 : Math.round(usd / 5) * 5;
  return `≈ US$${rounded.toLocaleString("en-US")}`;
};

export const billingLabel: Record<Billing, string> = {
  "one-time": "one-time",
  month: "/ month",
  year: "/ year",
};
