"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Stethoscope, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const confidences = [82, 41, 28];

export function DecisionSupport({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const t = useTranslations("visuals.decision");
  const dx = t.raw("dx") as string[];
  const differentials = dx.map((label, i) => ({ dx: label, conf: confidences[i] }));
  return (
    <div className={cn("glass rounded-2xl p-5 shadow-soft", className)}>
      <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
        <span className="grid size-8 place-items-center rounded-lg bg-zen/15 text-sky ring-1 ring-zen/25">
          <Stethoscope className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{t("title")}</p>
          <p className="text-[10px] text-faint">{t("subtitle")}</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-faint">
        {t("differential")}
      </p>
      <div className="mt-2 space-y-3">
        {differentials.map((d, i) => (
          <div key={d.dx}>
            <div className="mb-1 flex items-center justify-between text-[12px]">
              <span className="text-ink/90">{d.dx}</span>
              <span className="font-medium text-muted">{d.conf}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  i === 0
                    ? "bg-gradient-to-r from-zen to-sky"
                    : "bg-gradient-to-r from-zen/40 to-sky/30"
                )}
                initial={reduce ? { width: `${d.conf}%` } : { width: 0 }}
                whileInView={{ width: `${d.conf}%` }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[11px] text-muted ring-1 ring-hairline">
        <BookOpen className="size-3.5 text-sky" />
        {t("evidence")}
      </div>
    </div>
  );
}
