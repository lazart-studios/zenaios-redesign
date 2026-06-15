"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { DashboardMock } from "@/components/visuals/DashboardMock";
import { ZenAChat } from "@/components/visuals/ZenAChat";
import { siteConfig } from "@/lib/data/site";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const titleLines = [t("titleLine1"), t("titleLine2")];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-z grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-card-2 px-3 py-1.5 text-xs font-medium text-muted"
          >
            <span className="size-2 rounded-full bg-success" />
            {t("badge")}
          </motion.span>

          <h1 className="mt-6 text-balance text-[2.5rem] font-bold leading-[1.08] sm:text-5xl md:text-[3.6rem]">
            {titleLines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE }}
                >
                  {i === 1 ? (
                    <span className="text-gradient-blue">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
            className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted"
          >
            {t.rich("description", {
              b: (chunks) => <b className="text-ink">{chunks}</b>,
            })}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/demo" size="lg" withArrow>
              {t("ctaPrimary")}
            </Button>
            <Button href={siteConfig.demoUrl} variant="secondary" size="lg">
              <PlayCircle className="size-4.5" />
              {t("ctaSecondary")}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-faint"
          >
            <span className="uppercase tracking-[0.14em]">{t("deployedAt")}</span>
            <span className="text-muted">SJU Oradea</span>
            <span className="size-1 rounded-full bg-faint" />
            <span className="text-muted">Primăria Oradea</span>
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="relative z-10"
        >
          <div className="relative">
            <BrowserFrame>
              <DashboardMock />
            </BrowserFrame>

            {/* ZenA chat card */}
            <div className="absolute -bottom-10 -left-6 hidden w-[260px] sm:block lg:-left-14">
              <ZenAChat />
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none mt-16 flex justify-center"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-faint">
          {t("scrollCue")}
        </span>
      </motion.div>
    </section>
  );
}
