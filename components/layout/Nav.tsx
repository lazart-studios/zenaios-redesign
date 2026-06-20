"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Layers, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { primaryNav } from "@/lib/data/site";
import { buildCategories } from "@/lib/data/categories";
import { moduleSkeletons } from "@/lib/data/modules";
import { cn } from "@/lib/utils";

/** Module count per category — drives the "13 modules" sub-labels in the menu. */
const countFor = (slug: string) =>
  moduleSkeletons.filter((m) => m.category === slug).length;

export function Nav() {
  const t = useTranslations("nav");
  const cat = useTranslations("categories");
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePlatform, setMobilePlatform] = useState(true); // accordion open by default
  const [megaOpen, setMegaOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const domains = buildCategories(cat);
  const onPlatform = pathname.startsWith("/platform");

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes the desktop mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/85 backdrop-blur-2xl">
      <div className="container-z flex h-14 items-center justify-between gap-5">
        <Link href="/" aria-label={t("homeAria")} className="relative z-10">
          <Logo variant="dark" className="h-6 w-auto" />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            if (item.hasMenu) {
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <button
                    type="button"
                    onClick={() => setMegaOpen((o) => !o)}
                    aria-expanded={megaOpen}
                    className={cn(
                      "flex items-center gap-1 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                      active || megaOpen
                        ? "text-ink"
                        : "text-muted hover:text-ink",
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        megaOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        className="glass-strong absolute left-0 top-[calc(100%+0.5rem)] w-[30rem] rounded-2xl p-3"
                      >
                        {/* Overview lead */}
                        <Link
                          href="/platform"
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-card-2"
                        >
                          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zen/10 text-zen ring-1 ring-zen/15">
                            <Layers className="size-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-ink">
                              {t("platformOverview")}
                            </span>
                            <span className="block text-xs text-faint">
                              {t("megaTagline", { count: moduleSkeletons.length })}
                            </span>
                          </span>
                        </Link>

                        <div className="my-2 border-t border-hairline" />
                        <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-faint">
                          {t("byDomain")}
                        </p>

                        <div className="grid gap-0.5">
                          {domains.map((d) => {
                            const Icon = d.icon;
                            return (
                              <Link
                                key={d.slug}
                                href={`/platform/${d.slug}`}
                                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-card-2"
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zen/10 text-zen ring-1 ring-zen/15">
                                  <Icon className="size-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-semibold text-ink">
                                    {d.name}
                                  </span>
                                  <span className="block truncate text-xs text-faint">
                                    {d.tagline}
                                  </span>
                                </span>
                                <span className="shrink-0 text-xs font-medium text-muted">
                                  {t("modulesCount", { count: countFor(d.slug) })}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
                  active ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <LanguageSwitcher />
          <Button href="/demo" size="sm" className="hidden rounded-full sm:inline-flex">
            {t("requestDemo")}
          </Button>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-card-2 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={t("toggleMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile sheet ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-hairline bg-white lg:hidden"
          >
            <nav
              className="container-z flex min-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto py-3"
              aria-label="Mobile"
            >
              {primaryNav.map((item) => {
                if (item.hasMenu) {
                  return (
                    <div key={item.key} className="border-b border-hairline">
                      <button
                        type="button"
                        onClick={() => setMobilePlatform((o) => !o)}
                        aria-expanded={mobilePlatform}
                        className="flex w-full items-center justify-between py-4 text-2xl font-semibold tracking-tight text-ink"
                      >
                        {t(item.key)}
                        <ChevronDown
                          className={cn(
                            "size-6 text-muted transition-transform",
                            mobilePlatform && "rotate-180",
                          )}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {mobilePlatform && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pb-4">
                              <Link
                                href="/platform"
                                className="flex items-center gap-3 rounded-xl py-2.5"
                              >
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zen/10 text-zen ring-1 ring-zen/15">
                                  <Layers className="size-5" />
                                </span>
                                <span className="text-base font-semibold text-ink">
                                  {t("platformOverview")}
                                </span>
                              </Link>
                              {domains.map((d) => {
                                const Icon = d.icon;
                                return (
                                  <Link
                                    key={d.slug}
                                    href={`/platform/${d.slug}`}
                                    className="flex items-center gap-3 rounded-xl py-2.5"
                                  >
                                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zen/10 text-zen ring-1 ring-zen/15">
                                      <Icon className="size-5" />
                                    </span>
                                    <span className="flex-1 text-base font-semibold text-ink">
                                      {d.name}
                                    </span>
                                    <span className="text-sm font-medium text-faint">
                                      {t("modulesCount", { count: countFor(d.slug) })}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="border-b border-hairline py-4 text-2xl font-semibold tracking-tight text-ink"
                  >
                    {t(item.key)}
                  </Link>
                );
              })}

              <Button href="/demo" size="lg" className="mt-8 w-full rounded-full">
                {t("requestDemo")}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
