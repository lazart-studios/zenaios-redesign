"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/visuals/BrowserFrame";
import { DashboardMock } from "@/components/visuals/DashboardMock";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="container-z">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="text-sm font-semibold text-zen"
          >
            {t("badge")}
          </motion.p>

          <h1 className="mt-5 text-balance text-[3rem] font-semibold leading-[0.98] tracking-[-0.055em] text-ink sm:text-6xl md:text-[5rem] lg:text-[6rem]">
            {[t("titleLine1"), t("titleLine2")].map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={index === 1 ? "block text-zen" : "block"}
                  initial={reduce ? { opacity: 0 } : { y: "110%" }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 0.75, delay: 0.08 + index * 0.1, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
            className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl"
          >
            {t.rich("description", {
              b: (chunks) => <b className="font-medium text-ink">{chunks}</b>,
            })}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.44, ease: EASE }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/platform" size="lg" className="rounded-full px-8">
              {t("ctaPrimary")}
            </Button>
            <Button href="/demo" variant="ghost" size="lg" withArrow className="rounded-full">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="rounded-[2rem] bg-[#f5f5f7] p-2 sm:p-3">
            <BrowserFrame className="rounded-[1.5rem] border-black/[0.08] shadow-[0_30px_80px_-48px_rgba(3,16,68,0.35)]">
              <DashboardMock />
            </BrowserFrame>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
