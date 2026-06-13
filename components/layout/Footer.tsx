import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { footerNav, siteConfig } from "@/lib/data/site";

export function Footer() {
  const t = useTranslations("footer");
  const year = 2026;
  return (
    <footer className="relative border-t border-hairline bg-abyss">
      <div className="container-z py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + contact */}
          <div>
            <Logo variant="light" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t("tagline")}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <Phone className="size-4 text-sky" />
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2.5 text-muted transition-colors hover:text-ink"
              >
                <Mail className="size-4 text-sky" />
                {siteConfig.contact.email}
              </a>
              <p className="flex items-center gap-2.5 text-muted">
                <MapPin className="size-4 text-sky" />
                {siteConfig.contact.location}
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.titleKey}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                  {t(`columns.${col.titleKey}`)}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
                        >
                          {t(`links.${link.key}`)}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {t(`links.${link.key}`)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-sm text-faint sm:flex-row sm:items-center">
          <p>{t("rights", { year })}</p>
          <p className="text-xs">
            {t("builtFor", { location: siteConfig.contact.location })}
          </p>
        </div>
      </div>
    </footer>
  );
}
