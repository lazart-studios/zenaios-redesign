import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/data/site";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Locale-aware path helper. The default locale (English) stays unprefixed to
 * preserve existing URLs and SEO equity; every other locale is served under its
 * own prefix (`/ro`, `/hu`, …). Mirrors `localePrefix: "as-needed"`.
 */
export function localizedPath(locale: string, path = "/"): string {
  const clean = path === "/" ? "" : path;
  if (locale === routing.defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/** OpenGraph locale codes (BCP-47 → OG underscore form). */
const ogLocale: Record<Locale, string> = {
  en: "en_US",
  ro: "ro_RO",
  hu: "hu_HU",
  de: "de_DE",
  fr: "fr_FR",
};

/**
 * Per-page metadata helper. Builds the canonical + hreflang alternates for the
 * given path across every locale, plus localized OpenGraph/Twitter. Title flows
 * through the layout's `%s · ZenAiOS` template; pass the bare page title.
 */
export function buildMeta({
  locale,
  title,
  description,
  path = "/",
}: {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${siteConfig.url}${localizedPath(locale, path)}`;

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = `${siteConfig.url}${localizedPath(l, path)}`;
  }
  languages["x-default"] = `${siteConfig.url}${localizedPath(routing.defaultLocale, path)}`;

  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
    },
  };
}

/**
 * Convenience for pages whose title/description live in the `meta.<page>`
 * catalog namespace (platform, about, deployments, demo, contact, resources,
 * privacy, terms). Fetches the copy and returns full Metadata.
 */
export async function metaFromCatalog({
  locale,
  page,
  path,
}: {
  locale: Locale;
  page: string;
  path: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${page}` });
  return buildMeta({
    locale,
    title: t("title"),
    description: t("description"),
    path,
  });
}
