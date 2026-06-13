import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type ModuleStatus = "active" | "module" | "dev";

const config: Record<
  ModuleStatus,
  { dot: string; text: string; ring: string; bg: string }
> = {
  active: {
    dot: "bg-success",
    text: "text-success",
    ring: "ring-success/30",
    bg: "bg-success/10",
  },
  module: {
    dot: "bg-sky",
    text: "text-sky",
    ring: "ring-sky/25",
    bg: "bg-sky/10",
  },
  dev: {
    dot: "bg-warning",
    text: "text-warning",
    ring: "ring-warning/30",
    bg: "bg-warning/10",
  },
};

export function StatusBadge({
  status,
  label,
  className,
}: {
  status: ModuleStatus;
  label?: string;
  className?: string;
}) {
  const t = useTranslations("status");
  const c = config[status];
  const isLive = status === "active";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] ring-1",
        c.bg,
        c.text,
        c.ring,
        className
      )}
    >
      <span className="relative flex size-1.5">
        {isLive && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              c.dot
            )}
          />
        )}
        <span className={cn("relative inline-flex size-1.5 rounded-full", c.dot)} />
      </span>
      {label ?? t(status)}
    </span>
  );
}
