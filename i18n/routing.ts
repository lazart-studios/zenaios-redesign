import { defineRouting } from "next-intl/routing";

/**
 * The five languages the marketing site ships in. English is the default and
 * stays at the root (no `/en` prefix) so existing URLs and SEO equity survive;
 * the other four are served under a locale prefix (`/ro`, `/hu`, `/de`, `/fr`).
 */
export const locales = ["en", "ro", "hu", "de", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Narrowing guard — `hasLocale` isn't exported in next-intl v3, so we roll our own. */
export function isLocale(value: string | undefined): value is Locale {
  return value != null && (locales as readonly string[]).includes(value);
}

/** Written, in-language names for the switcher — no flags, no region codes. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ro: "Română",
  hu: "Magyar",
  de: "Deutsch",
  fr: "Français",
};

/** Short labels for the compact switcher trigger. */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  ro: "RO",
  hu: "HU",
  de: "DE",
  fr: "FR",
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  // English at "/", the rest prefixed. Keeps every existing English URL intact.
  localePrefix: "as-needed",
});
