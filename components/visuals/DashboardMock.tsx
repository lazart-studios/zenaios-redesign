"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BedDouble,
  Sparkles,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Counter } from "@/components/motion/Counter";
import { AreaChart, BarChart, Donut } from "@/components/visuals/Charts";
import { cn } from "@/lib/utils";

const kpis = [
  { icon: BedDouble, label: "Bed occupancy", value: 87, suffix: "%", delta: "+3.2%", up: true },
  { icon: Users, label: "Admissions today", value: 142, delta: "+12", up: true },
  { icon: Activity, label: "Avg. wait", value: 14, suffix: " min", delta: "-21%", up: false },
];

const departments = [
  { name: "Emergency", load: 92, trend: [4, 6, 5, 8, 7, 9, 8] },
  { name: "Cardiology", load: 64, trend: [3, 4, 4, 5, 6, 5, 6] },
  { name: "Radiology", load: 48, trend: [2, 3, 3, 2, 4, 3, 4] },
];

export function DashboardMock({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3 p-4 text-left sm:p-5", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-faint">
            Hospital Manager
          </p>
          <p className="text-sm font-semibold text-ink">Executive overview</p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-zen/10 px-2.5 py-1 text-[11px] font-medium text-sky ring-1 ring-zen/25">
          <Sparkles className="size-3" />
          AI predictive
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-3 gap-2.5">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-lg border border-hairline bg-white/[0.02] p-3"
            >
              <Icon className="size-4 text-sky" />
              <p className="mt-2 text-lg font-bold text-ink">
                <Counter value={k.value} suffix={k.suffix} duration={1.4} />
              </p>
              <p className="text-[10px] leading-tight text-faint">{k.label}</p>
              <span
                className={cn(
                  "mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium",
                  k.up ? "text-success" : "text-sky"
                )}
              >
                {k.up ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {k.delta}
              </span>
            </div>
          );
        })}
      </div>

      {/* Chart + donut */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="col-span-2 rounded-lg border border-hairline bg-white/[0.02] p-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium text-muted">Admissions · 14 days</p>
            <p className="text-[10px] text-faint">forecast</p>
          </div>
          <div className="mt-2">
            <AreaChart
              points={[0.3, 0.42, 0.38, 0.55, 0.6, 0.52, 0.7, 0.66, 0.78, 0.72, 0.85, 0.8, 0.92, 0.88]}
              height={70}
            />
          </div>
        </div>
        <div className="rounded-lg border border-hairline bg-white/[0.02] p-3">
          <p className="text-[11px] font-medium text-muted">Capacity</p>
          <div className="mt-1 grid place-items-center">
            <Donut value={87} size={78} stroke={8} label="in use" />
          </div>
        </div>
      </div>

      {/* Department load */}
      <div className="rounded-lg border border-hairline bg-white/[0.02] p-3">
        <p className="mb-2.5 text-[11px] font-medium text-muted">Department load</p>
        <div className="space-y-2.5">
          {departments.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-[11px] text-ink">{d.name}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                <div
                  className={cn(
                    "h-full rounded-full",
                    d.load > 85
                      ? "bg-gradient-to-r from-warning to-warning/60"
                      : "bg-gradient-to-r from-zen to-sky"
                  )}
                  style={{ width: `${d.load}%` }}
                />
              </div>
              <div className="h-5 w-10 shrink-0">
                <BarChart data={d.trend} />
              </div>
              <span className="w-8 shrink-0 text-right text-[11px] font-medium text-muted">
                {d.load}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className="flex items-center gap-2.5 rounded-lg border border-warning/25 bg-warning/[0.06] px-3 py-2.5">
        <TriangleAlert className="size-4 shrink-0 text-warning" />
        <p className="text-[11px] text-ink/90">
          Emergency nearing capacity — predicted surge in <b>~2h</b>. Suggest +2
          staff.
        </p>
      </div>
    </div>
  );
}
