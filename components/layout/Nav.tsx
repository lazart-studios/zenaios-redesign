"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { primaryNav } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.06] bg-white/85 backdrop-blur-2xl">
      <div className="container-z flex h-14 items-center justify-between gap-5">
        <Link href="/" aria-label={t("homeAria")} className="relative z-10">
          <Logo variant="dark" className="h-6 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "text-[13px] font-medium transition-colors",
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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-hairline bg-white lg:hidden"
          >
            <nav className="container-z flex min-h-[calc(100dvh-3.5rem)] flex-col py-7" aria-label="Mobile">
              {primaryNav.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="border-b border-hairline py-4 text-2xl font-semibold tracking-tight text-ink"
                >
                  {t(item.key)}
                </Link>
              ))}
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
