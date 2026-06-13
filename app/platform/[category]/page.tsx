import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ModuleCard } from "@/components/cards/ModuleCard";
import { CTASection } from "@/components/sections/CTASection";
import { categories, getCategory } from "@/lib/data/categories";
import { modulesByCategory } from "@/lib/data/modules";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return pageMeta({
    title: cat.name,
    description: cat.description,
    path: `/platform/${cat.slug}`,
  });
}

const highlights: Record<string, string[]> = {
  medical: [
    "The full clinical journey — front desk, triage, diagnosis, care, lab, management & CME",
    "AI epicrisis with ICD-10 & DRG coding",
    "Live in a county emergency hospital (SJUO)",
  ],
  administrative: [
    "Civic services and back-office processes",
    "RAG over legal, compliance & accounting documents",
    "Live at Oradea City Hall",
  ],
  "ai-infrastructure": [
    "100% offline, on-premise RAG (llama.cpp + FAISS)",
    "Multi-model comparison & benchmarking",
    "The sovereign foundation under every other module",
  ],
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const mods = modulesByCategory(cat.slug);
  const live = mods.filter((m) => m.status === "active").length;
  const isViolet = cat.accent === "violet";

  return (
    <>
      <PageHeader
        eyebrow={cat.label}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Platform", href: "/platform" },
          { label: cat.name },
        ]}
        title={
          <>
            {cat.name}.{" "}
            <span className={isViolet ? "text-violet" : "text-gradient"}>
              {cat.tagline}
            </span>
          </>
        }
        description={cat.description}
      >
        <ul className="grid max-w-2xl gap-2.5">
          {highlights[cat.slug]?.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-ink/90">
              <span className="mt-0.5 grid size-4.5 shrink-0 place-items-center rounded-full bg-sky/15">
                <Check className="size-3 text-sky" />
              </span>
              {h}
            </li>
          ))}
        </ul>
      </PageHeader>

      <Section>
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-hairline pb-4">
            <h2 className="text-xl font-bold text-ink">
              {mods.length} module{mods.length > 1 ? "s" : ""}
            </h2>
            {live > 0 && (
              <span className="inline-flex items-center gap-1.5 text-sm text-success">
                <span className="size-1.5 rounded-full bg-success" />
                {live} live deployment{live > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </Reveal>

        <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mods.map((m) => (
            <StaggerItem key={m.slug}>
              <ModuleCard module={m} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <Link
            href="/platform"
            className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-sky"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            All domains
          </Link>
        </Reveal>
      </Section>

      <CTASection />
    </>
  );
}
