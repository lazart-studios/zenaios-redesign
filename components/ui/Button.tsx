import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type LinkExtraProps = Omit<ComponentProps<typeof Link>, "href" | "className">;

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-[10px] font-medium tracking-tight " +
  "transition-all duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-sky disabled:pointer-events-none disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  // Primary = Zen Blue fill, white text, glow + lift on hover
  primary:
    "bg-zen text-white shadow-[0_10px_30px_-12px_rgba(0,118,253,0.9)] " +
    "hover:bg-zen-600 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-14px_rgba(0,118,253,1)] active:translate-y-0",
  // Secondary = sky outline on dark
  secondary:
    "border border-hairline-strong bg-white/[0.02] text-ink backdrop-blur-sm " +
    "hover:border-sky/60 hover:bg-sky/[0.08] hover:-translate-y-0.5",
  ghost: "text-muted hover:text-ink hover:bg-white/[0.04]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base [--h:3.25rem] h-[var(--h)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {withArrow && (
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...anchorRest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(anchorRest as LinkExtraProps)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {inner}
    </button>
  );
}
