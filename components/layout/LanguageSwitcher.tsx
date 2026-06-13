"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { locales } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * Language switcher scaffold. EN is active at launch; the RO route is wired for
 * next-intl later (selecting it shows a "coming soon" hint rather than 404-ing).
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = locales.find((l) => l.code === active) ?? locales[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-2.5 py-2 text-sm text-muted transition-colors hover:border-hairline-strong hover:text-ink"
      >
        <Globe className="size-4" />
        <span className="font-medium">{current.short}</span>
        <ChevronDown
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="glass absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl p-1 shadow-soft"
        >
          {locales.map((l) => {
            const isActive = l.code === active;
            const comingSoon = l.code !== "en";
            return (
              <button
                key={l.code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  if (!comingSoon) setActive(l.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  isActive ? "text-ink" : "text-muted hover:bg-white/5 hover:text-ink"
                )}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden>{l.flag}</span>
                  {l.label}
                </span>
                {isActive ? (
                  <Check className="size-4 text-sky" />
                ) : comingSoon ? (
                  <span className="text-[10px] uppercase tracking-wide text-faint">
                    soon
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
