"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { primaryNav, siteConfig } from "@/lib/data/site";
import { buildCategories } from "@/lib/data/categories";
import { countByCategory, moduleCount } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        mobileOpen
          ? "border-b border-hairline bg-abyss"
          : scrolled || megaOpen
            ? "border-b border-hairline bg-abyss/80 backdrop-blur-xl"
            : "border-b border-transparent"
      )}
    >
      <div className="container-z flex h-16 items-center justify-between gap-4 md:h-[72px]">
        {/* Logo */}
        <Link
          href="/"
          aria-label={t("homeAria")}
          className="relative z-10 transition-opacity hover:opacity-80"
        >
          <Logo variant="light" className="h-7 w-auto md:h-8" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Platform mega trigger */}
          <div
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            className="relative"
          >
            <button
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith("/platform")
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              )}
              aria-expanded={megaOpen}
            >
              {t("platform")}
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-300",
                  megaOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3"
                >
                  <MegaMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {primaryNav
            .filter((l) => l.href !== "/platform")
            .map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-sky xl:inline-flex"
          >
            {t("livePlatform")}
            <ArrowUpRight className="size-3.5" />
          </a>
          <LanguageSwitcher className="hidden sm:block" />
          <Button href="/demo" size="sm" className="hidden sm:inline-flex">
            {t("requestDemo")}
          </Button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-hairline text-ink lg:hidden"
            aria-label={t("toggleMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && <MobileMenu pathname={pathname} />}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu() {
  const t = useTranslations("nav");
  const categories = buildCategories(useTranslations("categories"));
  return (
    <div className="glass-strong overflow-hidden rounded-2xl shadow-soft">
      <div className="grid grid-cols-5">
        {/* By domain */}
        <div className="col-span-3 p-3">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            {t("byDomain")}
          </p>
          <div className="space-y-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/platform/${cat.slug}`}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ring-1",
                      cat.accent === "violet"
                        ? "bg-violet/10 text-violet ring-violet/25"
                        : "bg-zen/10 text-sky ring-zen/25"
                    )}
                  >
                    <Icon className="size-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                      {cat.name}
                      <span className="text-xs font-normal text-faint">
                        {t("modulesCount", { count: countByCategory(cat.slug) })}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                      {cat.tagline}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Explore + featured */}
        <div className="col-span-2 border-l border-hairline bg-white/[0.02] p-3">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
            {t("explore")}
          </p>
          <Link
            href="/platform"
            className="block rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
          >
            {t("platformOverview")}
          </Link>
          <Link
            href="/deployments"
            className="block rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
          >
            {t("liveDeployments")}
          </Link>

          <Link
            href="/platform"
            className="glow-zen mt-3 block rounded-xl bg-gradient-to-br from-zen/15 to-transparent p-4 ring-1 ring-hairline transition-transform hover:-translate-y-0.5"
          >
            <StatusBadge status="active" label={t("liveNow")} />
            <p className="mt-3 text-sm font-semibold text-ink">
              {t("megaTagline", { count: moduleCount })}
            </p>
            <p className="mt-1 text-xs text-muted">{t("megaCta")}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const t = useTranslations("nav");
  const categories = buildCategories(useTranslations("categories"));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-hairline bg-abyss lg:hidden"
    >
      <div className="container-z flex flex-col gap-1 py-6">
        <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
          {t("platform")}
        </p>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/platform/${cat.slug}`}
            className="flex items-center justify-between rounded-lg px-3 py-3 text-base text-ink"
          >
            {cat.name}
            <span className="text-xs text-faint">
              {t("modulesCount", { count: countByCategory(cat.slug) })}
            </span>
          </Link>
        ))}
        <Link
          href="/platform"
          className="rounded-lg px-3 py-3 text-base text-muted"
        >
          {t("platformOverview")}
        </Link>

        <div className="my-3 h-px bg-hairline" />

        {primaryNav
          .filter((l) => l.href !== "/platform")
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-3 text-base",
                pathname.startsWith(link.href) ? "text-ink" : "text-muted"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        <a
          href={siteConfig.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-lg px-3 py-3 text-base text-muted"
        >
          {t("livePlatform")} <ArrowUpRight className="size-4" />
        </a>

        <div className="mt-4 flex items-center gap-3 px-3">
          <Button href="/demo" className="flex-1">
            {t("requestDemo")}
          </Button>
          <LanguageSwitcher />
        </div>
      </div>
    </motion.div>
  );
}
