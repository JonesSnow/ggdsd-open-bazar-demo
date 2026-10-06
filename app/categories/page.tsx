import type { Metadata } from "next";
import Link from "next/link";
import type { Category } from "@/src/types";
import { categories } from "@/src/data/categories";
import { getBusinessesByCategory } from "@/src/data/businesses";
import { artPath } from "@/src/utils/images";
import { pluralize } from "@/src/utils/format";
import { Container, PageHeader, Reveal, SectionHeading } from "@/src/components/ui/section";
import { Icon } from "@/src/components/ui/icon";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse the Open Bazar directory by category.",
};

export default function CategoriesPage() {
  const sorted = [...categories].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageHeader
        eyebrow="Categories"
        title="Browse by what you're after"
        description="Ten corners of the bazar — each one run by students, alumni and independent campus vendors."
        className="border-b border-paper-200 bg-paper-100/60"
      />

      <Container className="py-16">
        {/* Featured categories — editorial split */}
        <div className="grid gap-5 lg:grid-cols-2">
          {sorted.filter((category) => category.featured).slice(0, 2).map((category, index) => (
            <Reveal key={category.id} delay={index * 80}>
              <CategoryHeroCard category={category} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="All categories"
            title="The full floor plan"
            align="left"
            level={2}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((category, index) => (
              <Reveal key={category.id} delay={(index % 3) * 70}>
                <CategoryRowCard category={category} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

function CategoryHeroCard({ category }: { category: Category }) {
  const count = getBusinessesByCategory(category.id).length;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative min-h-[320px] overflow-hidden rounded-card shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artPath(category.artSlug, 0)}
        alt=""
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-ink-800 backdrop-blur-sm">
          {pluralize(count || category.businessCount, "business")}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold text-white text-balance">
          {category.name}
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-200/90">
          {category.longDescription ?? category.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brass-300">
          Explore category
          <Icon name="arrow-right" size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function CategoryRowCard({ category }: { category: Category }) {
  const count = getBusinessesByCategory(category.id).length;
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex items-center gap-4 rounded-card border border-paper-200 bg-white p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-pine-300 hover:shadow-soft"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artPath(category.artSlug, 0)}
        alt=""
        width={240}
        height={240}
        loading="lazy"
        decoding="async"
        className="h-16 w-16 shrink-0 rounded-xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-lg font-semibold text-ink-950 transition-colors group-hover:text-pine-700">
          {category.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-sm text-ink-500">
          {category.description}
        </p>
        <p className="mt-1 text-xs font-medium text-pine-700">
          {pluralize(count || category.businessCount, "business")}
        </p>
      </div>
      <Icon
        name="arrow-up-right"
        size={18}
        className="shrink-0 text-ink-300 transition-all duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pine-600"
      />
    </Link>
  );
}
