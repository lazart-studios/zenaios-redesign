"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Siren } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const levelColors: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-warning",
  4: "bg-success",
  5: "bg-sky",
};

// Bed ids stay literal (mockup); the complaints come from the catalog `queue` array.
const queueBeds = ["Bed 04", "Bed 11", "Bed 07", "Bed 02"];
const queueLevels = [1, 2, 3, 4];

export function TriageBoard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const t = useTranslations("visuals.triage");
  const complaints = t.raw("queue") as string[];
  return (
    <div className={cn("glass rounded-2xl p-5 shadow-soft", className)}>
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-warning/15 text-warning ring-1 ring-warning/25">
            <Siren className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{t("title")}</p>
            <p className="text-[10px] text-faint">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {queueBeds.map((bed, i) => {
          const lvl = queueLevels[i];
          return (
            <motion.div
              key={bed}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex items-center gap-3 rounded-lg border border-hairline bg-surface px-3 py-2"
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white",
                  levelColors[lvl]
                )}
              >
                {lvl}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-ink">{bed}</p>
                <p className="truncate text-[10px] text-faint">{complaints[i]}</p>
              </div>
              <span className="text-[10px] text-muted">{t(`levels.${lvl}`)}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/[0.08] px-3 py-2 text-[11px] text-ink/90 ring-1 ring-red-500/20">
        <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
        {t("alert")}
      </div>
    </div>
  );
}
