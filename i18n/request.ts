import { getRequestConfig } from "next-intl/server";
import { routing, isLocale } from "./routing";

/**
 * Per-request i18n config. Resolves the active locale from the URL segment and
 * loads the matching message catalog from /messages.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
