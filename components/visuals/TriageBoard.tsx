"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Siren } from "lucide-react";
import { cn } from "@/lib/utils";

const levels: Record<number, { label: string; color: string }> = {
  1: { label: "Immediate", color: "bg-red-500" },
  2: { label: "Very urgent", color: "bg-orange-500" },
  3: { label: "Urgent", color: "bg-warning" },
  4: { label: "Standard", color: "bg-success" },
  5: { label: "Non-urgent", color: "bg-sky" },
};

const queue = [
  { id: "Bed 04", c: "Chest pain, SOB", lvl: 1 },
  { id: "Bed 11", c: "Head injury", lvl: 2 },
  { id: "Bed 07", c: "Abdominal pain", lvl: 3 },
  { id: "Bed 02", c: "Sprained ankle", lvl: 4 },
];

export function TriageBoard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("glass rounded-2xl p-5 shadow-soft", className)}>
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-warning/15 text-warning ring-1 ring-warning/25">
            <Siren className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Emergency triage</p>
            <p className="text-[10px] text-faint">Manchester + AI · auto-sorted</p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {queue.map((p, i) => {
          const l = levels[p.lvl];
          return (
            <motion.div
              key={p.id}
              initial={reduce ? { opacity: 1 } : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex items-center gap-3 rounded-lg border border-hairline bg-white/[0.02] px-3 py-2"
            >
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-md text-[11px] font-bold text-white",
                  l.color
                )}
              >
                {p.lvl}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-ink">{p.id}</p>
                <p className="truncate text-[10px] text-faint">{p.c}</p>
              </div>
              <span className="text-[10px] text-muted">{l.label}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-500/[0.08] px-3 py-2 text-[11px] text-ink/90 ring-1 ring-red-500/20">
        <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
        Level 1 alerted to attending physician
      </div>
    </div>
  );
}
