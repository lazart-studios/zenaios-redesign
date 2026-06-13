"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Animated vertical bar chart. */
export function BarChart({
  data,
  className,
  highlight = -1,
}: {
  data: number[];
  className?: string;
  highlight?: number;
}) {
  const reduce = useReducedMotion();
  const max = Math.max(...data, 1);
  return (
    <div className={cn("flex h-full items-end gap-1.5", className)}>
      {data.map((v, i) => {
        const h = `${(v / max) * 100}%`;
        const isHi = i === highlight;
        return (
          <motion.div
            key={i}
            className={cn(
              "flex-1 rounded-t-[3px]",
              isHi
                ? "bg-gradient-to-t from-zen to-sky"
                : "bg-gradient-to-t from-zen/40 to-sky/30"
            )}
            initial={reduce ? { height: h } : { height: 0 }}
            whileInView={{ height: h }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.04, ease: EASE }}
          />
        );
      })}
    </div>
  );
}

/** Animated area/line chart drawn from a normalised series (0..1). */
export function AreaChart({
  points,
  className,
  width = 320,
  height = 96,
}: {
  points: number[];
  className?: string;
  width?: number;
  height?: number;
}) {
  const reduce = useReducedMotion();
  const stepX = width / (points.length - 1);
  const coords = points.map((p, i) => [i * stepX, height - p * height]);
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full", className)}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0076fd" stopOpacity="0.35" />
          <stop offset="1" stopColor="#0076fd" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill="url(#area-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#71beff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  );
}

/** Animated donut / radial progress. */
export function Donut({
  value,
  size = 92,
  stroke = 9,
  label,
  className,
}: {
  value: number; // 0..100
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className={cn("relative inline-grid place-items-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(113,190,255,0.14)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#0076fd"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.3, ease: EASE }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="block text-lg font-bold text-ink">{value}%</span>
        {label && <span className="text-[10px] text-faint">{label}</span>}
      </div>
    </div>
  );
}
