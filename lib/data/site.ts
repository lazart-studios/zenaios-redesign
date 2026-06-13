export const siteConfig = {
  name: "ZenAiOS",
  shortName: "ZenAiOS",
  domain: "zenaios.com",
  url: "https://www.zenaios.com",
  description:
    "The AI operating system for modern hospitals — 17 AI modules across clinical care, hospital management and public health, already live in real institutions.",
  tagline: "The AI operating system for modern hospitals.",
  platformUrl: "https://platform.zenaios.com",
  demoUrl: "https://demo.zenaios.com",
  contact: {
    phone: "+40 735 779 579",
    phoneHref: "tel:+40735779579",
    email: "office@zenaios.com",
    location: "Oradea, România",
  },
} as const;

export const locales = [
  { code: "en", label: "English", short: "EN", flag: "🇬🇧" },
  { code: "ro", label: "Română", short: "RO", flag: "🇷🇴" },
] as const;

export const defaultLocale = "en";

export type NavLink = { label: string; href: string; external?: boolean };

/** Primary navigation. "Platform" opens the mega-menu (handled in Nav). */
export const primaryNav: NavLink[] = [
  { label: "Platform", href: "/platform" },
  { label: "Deployments", href: "/deployments" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

/** Footer columns — every link resolves to a real route. */
export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Medical", href: "/platform/medical" },
      { label: "Administrative", href: "/platform/administrative" },
      { label: "AI Infrastructure", href: "/platform/ai-infrastructure" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Deployments", href: "/deployments" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Request a demo", href: "/demo" },
      { label: "Live platform", href: "https://demo.zenaios.com", external: true },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];
