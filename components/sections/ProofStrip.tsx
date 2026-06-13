import { CheckCircle2 } from "lucide-react";
import { proofBadges } from "@/lib/data/outcomes";

export function ProofStrip() {
  const items = [...proofBadges, ...proofBadges];
  return (
    <section className="border-y border-hairline bg-white/[0.015] py-8">
      <div className="container-z">
        <p className="mb-6 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-faint">
          Real deployments, real standards — no placeholder logos
        </p>
      </div>
      <div className="mask-x relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4">
          {items.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline bg-card/40 px-4 py-2 text-sm text-muted"
            >
              <CheckCircle2 className="size-4 text-sky" />
              {badge}
            </span>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-marquee items-center gap-4 pr-4"
          aria-hidden
        >
          {items.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-hairline bg-card/40 px-4 py-2 text-sm text-muted"
            >
              <CheckCircle2 className="size-4 text-sky" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
