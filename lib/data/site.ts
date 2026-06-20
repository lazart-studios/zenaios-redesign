/**
 * Canonical site origin (no trailing slash). Used for metadataBase, canonical
 * tags, OpenGraph URLs, sitemap and robots — all server-side only.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — explicit override; set this on the real production
 *     domain once www.zenaios.com points at this app.
 *  2. VERCEL_URL — on Vercel, self-reference the live deployment so preview URLs
 *     unfurl correctly and we never advertise a domain that isn't serving this build.
 *  3. localhost — during `next dev`.
 *  4. https://www.zenaios.com — default canonical home (e.g. local prod builds).
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://www.zenaios.com";
}

export const siteConfig = {
  name: "ZenAiOS",
  shortName: "ZenAiOS",
  domain: "zenaios.com",
  url: resolveSiteUrl(),
  platformUrl: "https://platform.zenaios.com",
  demoUrl: "https://demo.zenaios.com",
  contact: {
    phone: "+40 724 257 745",
    phoneHref: "tel:+40724257745",
    email: "office@zenaios.com",
    location: "Oradea, România",
  },
} as const;

/**
 * Navigation skeletons. Labels are resolved at render time from the message
 * catalog: primary items via `nav.*`, footer columns via `footer.columns.*` and
 * footer links via `footer.links.*`.
 */
export type PrimaryNavItem = { key: string; href: string };

/** Primary navigation. "platform" opens the mega-menu (handled in Nav). */
export const primaryNav: PrimaryNavItem[] = [
  { key: "platform", href: "/platform" },
  { key: "industries", href: "/industries" },
  { key: "deployments", href: "/deployments" },
  { key: "about", href: "/about" },
  { key: "resources", href: "/resources" },
];

export type FooterColumn = {
  titleKey: string;
  links: { key: string; href: string; external?: boolean }[];
};

/** Footer columns — every link resolves to a real route. */
export const footerNav: FooterColumn[] = [
  {
    titleKey: "platform",
    links: [
      { key: "overview", href: "/platform" },
      { key: "medical", href: "/platform/medical" },
      { key: "administrative", href: "/platform/administrative" },
      { key: "aiInfrastructure", href: "/platform/ai-infrastructure" },
    ],
  },
  {
    titleKey: "company",
    links: [
      { key: "about", href: "/about" },
      { key: "industries", href: "/industries" },
      { key: "deployments", href: "/deployments" },
      { key: "resources", href: "/resources" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    titleKey: "getStarted",
    links: [
      { key: "requestDemo", href: "/demo" },
      { key: "livePlatform", href: siteConfig.demoUrl, external: true },
      { key: "privacy", href: "/legal/privacy" },
      { key: "terms", href: "/legal/terms" },
    ],
  },
];
