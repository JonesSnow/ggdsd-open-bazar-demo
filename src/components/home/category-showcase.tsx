import Link from "next/link";
import type { Category } from "@/src/types";
import { artPath } from "@/src/utils/images";
import { pluralize } from "@/src/utils/format";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";

/**
 * Editorial category showcase: two large tiles + smaller tiles.
 */
export function CategoryShowcase({
  categories,
  categoryCounts,
}: {
  categories: Category[];
  categoryCounts: Record<string, number>;
}) {
  const featured = categories.filter((category) => category.featured);
  const [first, second, ...rest] = featured;

  return (
    <section aria-labelledby="categories-heading" className="bg-paper-100/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-pine-700">
              Find your next favourite
            </p>
            <h2
              id="categories-heading"
              className="max-w-xl font-display text-3xl font-medium tracking-heading text-ink-950 text-balance sm:text-4xl"
            >
              Browse categories
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">
              Find student stalls, handmade products, food, services and more around campus.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/explore-shops"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-pine-700 transition-colors hover:text-pine-800 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
            >
              Explore all shops
              <Icon name="arrow-right" size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/categories"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-600 transition-colors hover:text-pine-800 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
            >
              View all categories
              <Icon name="arrow-right" size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* Two large tiles */}
          {[first, second]
            .filter((category): category is Category => Boolean(category))
            .map((category, index) => (
              <CategoryTile
                key={category.id}
                category={category}
              businessCount={categoryCounts[category.id] ?? 0}
                large
                className={cn(
                  "lg:row-span-2 lg:col-span-2",
                  index === 0 && "lg:order-1",
                  index === 1 && "lg:order-3"
                )}
              />
            ))}
          {/* Smaller tiles */}
          {rest.map((category, index) => (
            <CategoryTile
              key={category.id}
              category={category}
              businessCount={categoryCounts[category.id] ?? 0}
              className={cn(index === 0 && "lg:order-2", index === 1 && "lg:order-4")}
            />
          ))}
          {/* All categories tile */}
          <Link
            href="/categories"
            className="group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-card bg-pine-950 p-6 text-paper-100 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700 lg:order-5 lg:min-h-0"
          >
            <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full border-[18px] border-pine-900" />
            <div className="flex items-start justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brass-500 text-brass-950">
                <Icon name="layout-grid" size={20} />
              </span>
              <Icon name="arrow-up-right" size={20} className="text-brass-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold">
                All categories
              </h3>
              <p className="mt-1 text-sm text-pine-300">
                Everything else on the bazar floor
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  category,
  businessCount,
  large = false,
  className,
}: {
  category: Category;
  businessCount: number;
  large?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group relative min-h-[220px] overflow-hidden rounded-card shadow-sm ring-1 ring-ink-950/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700",
        large ? "min-h-[280px]" : "",
        className
      )}
      aria-label={`Browse ${category.name} — ${pluralize(businessCount, "business")}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={artPath(category.artSlug, 0)}
        alt=""
        width={1200}
        height={900}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]",
          large ? "opacity-90" : "opacity-80"
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-linear-to-t from-ink-950/85 via-ink-950/25 to-ink-950/5"
        )}
      />
      <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/85 px-3 py-1 text-[11px] font-semibold text-ink-800 backdrop-blur-sm">
            {pluralize(businessCount, "business")}
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-pine-800 transition-transform duration-300 group-hover:rotate-45 backdrop-blur-sm">
            <Icon name="arrow-up-right" size={16} />
          </span>
        </div>
        <div>
          <h3 className={cn("font-display font-semibold text-white text-balance", large ? "text-2xl sm:text-3xl" : "text-xl")}>
            {category.name}
          </h3>
          {large && (
            <p className="mt-2 max-w-md text-sm leading-relaxed text-paper-200/90">
              {category.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
