"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const lines = [88, 96, 72, 90, 64, 82];

export function EpicrisisDoc({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "glass rounded-2xl p-5 shadow-soft",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-zen/15 text-sky ring-1 ring-zen/25">
            <FileText className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Epicrisis — draft</p>
            <p className="text-[10px] text-faint">Patient #2241 · auto-generated</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-sky/10 px-2 py-1 text-[10px] font-medium text-sky ring-1 ring-sky/25">
          <Sparkles className="size-3" />
          AI
        </span>
      </div>

      {/* Coding chips */}
      <div className="flex flex-wrap gap-1.5 py-3">
        {["ICD-10 · I21.9", "DRG · 04M", "FOCG linked"].map((c) => (
          <span
            key={c}
            className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-muted ring-1 ring-hairline"
          >
            {c}
          </span>
        ))}
      </div>

      {/* "Typing" document lines */}
      <div className="space-y-2">
        {lines.map((w, i) => (
          <motion.div
            key={i}
            className="h-2 rounded-full bg-gradient-to-r from-white/15 to-white/5"
            style={{ width: `${w}%`, transformOrigin: "left" }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.18, ease: "easeOut" }}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-success">
        <span className="grid size-4 place-items-center rounded-full bg-success/15">
          <Check className="size-2.5" />
        </span>
        Ready for clinician review · 8s
      </div>
    </div>
  );
}
