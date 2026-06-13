import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  visual,
  reversed = false,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  bullets?: string[];
  visual: React.ReactNode;
  reversed?: boolean;
  link?: { href: string; label: string };
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Copy */}
      <Reveal
        direction={reversed ? "left" : "right"}
        className={cn(reversed && "lg:order-2")}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-4 text-balance text-2xl font-bold sm:text-3xl">{title}</h3>
        <p className="mt-3 max-w-md text-muted">{description}</p>

        {bullets && (
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-ink/90">
                <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-sky/15">
                  <Check className="size-3 text-sky" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}

        {link && (
          <Link
            href={link.href}
            className="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-sky"
          >
            {link.label}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </Reveal>

      {/* Visual */}
      <Reveal
        direction={reversed ? "right" : "left"}
        delay={0.1}
        className={cn("relative", reversed && "lg:order-1")}
      >
        {visual}
      </Reveal>
    </div>
  );
}
