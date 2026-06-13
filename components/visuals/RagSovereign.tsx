"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CloudOff, FileStack, Cpu, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function RagSovereign({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("glass rounded-2xl p-5 shadow-soft", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-violet/15 text-violet ring-1 ring-violet/30">
            <ShieldCheck className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">ZEN_RAG</p>
            <p className="text-[10px] text-faint">On-premise · data-sovereign</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-violet/10 px-2 py-1 text-[10px] font-medium text-violet ring-1 ring-violet/25">
          <CloudOff className="size-3" />
          No cloud
        </span>
      </div>

      {/* On-prem boundary */}
      <div className="relative mt-4 rounded-xl border border-dashed border-violet/30 bg-violet/[0.04] p-4">
        <span className="absolute -top-2 left-4 bg-card px-2 text-[9px] font-medium uppercase tracking-wider text-violet">
          On-premise
        </span>

        <div className="flex items-center justify-between gap-2">
          <Node icon={FileStack} label="Documents" sub="medical · legal" />
          <Flow reduce={!!reduce} />
          <Node icon={Cpu} label="Local LLM" sub="llama.cpp + FAISS" accent />
          <Flow reduce={!!reduce} delay={0.4} />
          <Node icon={ShieldCheck} label="Answer" sub="cited · private" />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          ["100%", "offline"],
          ["0", "data leaves"],
          ["6+", "models"],
        ].map(([v, l]) => (
          <div
            key={l}
            className="rounded-lg border border-hairline bg-white/[0.02] py-2"
          >
            <p className="text-sm font-bold text-ink">{v}</p>
            <p className="text-[10px] text-faint">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Node({
  icon: Icon,
  label,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl ring-1",
          accent
            ? "bg-violet/15 text-violet ring-violet/30"
            : "bg-white/[0.04] text-sky ring-hairline"
        )}
      >
        <Icon className="size-4.5" />
      </span>
      <span className="text-[10px] font-medium text-ink">{label}</span>
      <span className="font-mono text-[8px] text-faint">{sub}</span>
    </div>
  );
}

function Flow({ reduce, delay = 0 }: { reduce: boolean; delay?: number }) {
  return (
    <div className="relative h-px flex-1 bg-violet/20">
      {!reduce && (
        <motion.span
          className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-violet shadow-[0_0_8px_2px_rgba(167,139,250,0.6)]"
          animate={{ left: ["0%", "100%"] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
}
