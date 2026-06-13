"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const messages = [
  { from: "user", text: "Rezumă internările din ultima tură la Cardiologie." },
  {
    from: "zena",
    text: "8 internări în ultimele 12h. 2 cazuri prioritare semnalate. Epicriză generată pentru pacientul #2241.",
  },
  { from: "user", text: "Generate the discharge summary in English." },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.7, delayChildren: 0.2 } },
};
const bubble: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ZenAChat({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "glass flex w-full max-w-[320px] flex-col rounded-2xl p-4 shadow-soft",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-hairline pb-3">
        <span className="grid size-8 place-items-center rounded-full bg-zen/15 ring-1 ring-zen/30">
          <Logo markOnly className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            ZenA
            <Sparkles className="size-3 text-sky" />
          </p>
          <p className="text-[10px] text-faint">Assistant · 6 languages · voice</p>
        </div>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-success">
          <span className="size-1.5 rounded-full bg-success" />
          online
        </span>
      </div>

      {/* Messages */}
      <motion.div
        className="flex flex-col gap-2.5 py-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            variants={bubble}
            className={cn(
              "max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug",
              m.from === "user"
                ? "self-end rounded-br-sm bg-zen text-white"
                : "self-start rounded-bl-sm bg-white/[0.05] text-ink/90 ring-1 ring-hairline"
            )}
          >
            {m.text}
          </motion.div>
        ))}
        {/* typing indicator */}
        <motion.div
          variants={bubble}
          className="self-start rounded-2xl rounded-bl-sm bg-white/[0.05] px-3 py-2.5 ring-1 ring-hairline"
        >
          <span className="flex gap-1">
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                className="size-1.5 rounded-full bg-sky"
                animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
              />
            ))}
          </span>
        </motion.div>
      </motion.div>

      {/* Composer + voice */}
      <div className="mt-auto flex items-center gap-2 rounded-xl border border-hairline bg-abyss/50 px-3 py-2">
        <span className="text-[12px] text-faint">Ask ZenA…</span>
        <div className="ml-auto flex items-end gap-0.5">
          {[6, 11, 8, 14, 9, 5].map((h, i) => (
            <motion.span
              key={i}
              className="w-0.5 rounded-full bg-sky/70"
              style={{ height: h }}
              animate={reduce ? undefined : { scaleY: [0.5, 1.3, 0.7, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
          <Mic className="ml-1 size-3.5 text-sky" />
        </div>
      </div>
    </div>
  );
}
