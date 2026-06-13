"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, localeNames, localeShort, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Locale switcher. Five languages by written, in-language name (no flags, no
 * region codes). Selecting one navigates to the same page in that locale via
 * next-intl's router — English stays at `/`, the rest get a `/<locale>` prefix.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("languageSwitcher");
  const active = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function select(locale: Locale) {
    setOpen(false);
    if (locale === active) return;
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-2.5 py-2 text-sm text-muted transition-colors hover:border-hairline-strong hover:text-ink disabled:opacity-60"
      >
        <Globe className="size-4" />
        <span className="font-medium">{localeShort[active]}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={t("label")}
          className="glass-strong absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl p-1 shadow-soft"
        >
          {locales.map((code) => {
            const isActive = code === active;
            return (
              <button
                key={code}
                role="option"
                aria-selected={isActive}
                onClick={() => select(code)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  isActive
                    ? "text-ink"
                    : "text-muted hover:bg-white/5 hover:text-ink"
                )}
              >
                <span>{localeNames[code]}</span>
                {isActive && <Check className="size-4 text-sky" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
