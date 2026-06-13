"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "org" | "role" | "message";
type Errors = Partial<Record<Field, string>>;

const roles = [
  "Hospital leadership (CMO / CIO / CEO)",
  "Clinician (doctor / nurse / resident)",
  "Public institution",
  "Investor / EU-funding evaluator",
  "Partner / integrator",
  "Other",
];

const inputBase =
  "w-full rounded-xl border border-hairline bg-white/[0.02] px-4 py-2.5 text-sm text-ink " +
  "placeholder:text-faint outline-none transition-colors focus:border-sky/60 focus:bg-white/[0.04]";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export function LeadForm({
  kind = "demo",
  className,
}: {
  kind?: "demo" | "contact";
  className?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function validate(data: Record<Field, string>): Errors {
    const e: Errors = {};
    if (data.name.trim().length < 2) e.name = "Please enter your name.";
    if (!isEmail(data.email)) e.email = "Enter a valid work email.";
    if (data.org.trim().length < 2) e.org = "Tell us where you work.";
    if (data.message.trim().length < 10)
      e.message = "A sentence or two helps us prepare.";
    return e;
  }

  function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      org: String(fd.get("org") ?? ""),
      role: String(fd.get("role") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // Visual stub — no real backend submission (per project scope).
    setStatus("sending");
    // Simulate a short round-trip purely for UX feedback.
    const start = performance.now();
    const tick = () => {
      if (performance.now() - start > 900) setStatus("sent");
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-hairline bg-card/40 p-6 md:p-8",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-success/15 text-success ring-1 ring-success/30">
              <Check className="size-7" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-ink">Thank you — almost there</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              This is a demo form, so nothing was sent. On the live site this would
              reach the ZenAiOS team and we&apos;d reply within one business day.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-medium text-sky transition-colors hover:text-sky/80"
            >
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Full name" error={errors.name}>
                <input name="name" className={inputBase} placeholder="Jane Doe" />
              </FormField>
              <FormField label="Work email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  className={inputBase}
                  placeholder="jane@hospital.ro"
                />
              </FormField>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Organization" error={errors.org}>
                <input
                  name="org"
                  className={inputBase}
                  placeholder="County Emergency Hospital"
                />
              </FormField>
              <FormField label="You are a…" error={errors.role}>
                <select name="role" defaultValue={roles[0]} className={cn(inputBase, "appearance-none")}>
                  {roles.map((r) => (
                    <option key={r} value={r} className="bg-abyss text-ink">
                      {r}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField
              label={kind === "demo" ? "What would you like to see?" : "How can we help?"}
              error={errors.message}
            >
              <textarea
                name="message"
                rows={4}
                className={cn(inputBase, "resize-none")}
                placeholder={
                  kind === "demo"
                    ? "We're a 400-bed hospital interested in the AI epicrisis and triage modules…"
                    : "Tell us a bit about what you're looking for…"
                }
              />
            </FormField>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-1.5 text-xs text-faint">
                <AlertCircle className="size-3.5" />
                Demo form — submissions aren&apos;t stored or sent.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn(
                  "group inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-zen px-6 text-[15px] font-medium text-white",
                  "shadow-[0_10px_30px_-12px_rgba(0,118,253,0.9)] transition-all duration-300",
                  "hover:bg-zen-600 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
                )}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    {kind === "demo" ? "Request demo" : "Send message"}
                    <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 flex items-center gap-1 text-[11px] text-warning"
          >
            <AlertCircle className="size-3" />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
