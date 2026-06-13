import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { footerNav, siteConfig } from "@/lib/data/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative border-t border-hairline bg-abyss">
      <div className="container-z py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + contact */}
          <div>
            <Logo variant="light" className="h-8 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline} 17 AI modules across clinical care, hospital
              management and public health — live in real institutions.
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
              <div key={col.title}>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                  {col.title}
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
                          {link.label}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {link.label}
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
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs">
            Built for clinical-grade trust · WCAG 2.1 AA · {siteConfig.contact.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
