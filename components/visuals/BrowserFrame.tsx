import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/** A lightweight app-window chrome so in-code mockups read as real product UI. */
export function BrowserFrame({
  url = "platform.zenaios.com",
  children,
  className,
  contentClassName,
}: {
  url?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-hairline bg-card/80 shadow-soft backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-hairline bg-white/[0.02] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-abyss/60 px-3 py-1 text-[11px] text-faint ring-1 ring-hairline">
          <Lock className="size-3 text-success" />
          {url}
        </div>
        <div className="w-8" />
      </div>
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  );
}
