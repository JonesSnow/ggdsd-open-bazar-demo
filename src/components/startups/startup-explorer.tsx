"use client";

import { useMemo, useState } from "react";
import type { Business, BusinessType } from "@/src/types";
import { businessTypeLabels } from "@/src/data/site";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";
import { BusinessCard } from "@/src/components/business/business-card";
import { EmptyState } from "@/src/components/ui/empty-state";

/** Venture types that belong to the Startups experience. */
export const STARTUP_TYPES: BusinessType[] = [
  "student-entrepreneur",
  "startup",
  "alumni-startup",
  "iic-associated",
];

type TypeFilter = "all" | BusinessType;

const TYPE_TABS: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All ventures" },
  { value: "student-entrepreneur", label: "Student" },
  { value: "startup", label: "Startups" },
  { value: "alumni-startup", label: "Alumni" },
  { value: "iic-associated", label: "IIC associated" },
];

const SORTS = [
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name", label: "A – Z" },
] as const;

export function StartupExplorer({ all }: { all: Business[] }) {
  const [type, setType] = useState<TypeFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("rating");

  const pool = useMemo(
    () => all.filter((business) => STARTUP_TYPES.includes(business.type)),
    [all]
  );

  const results = useMemo(() => {
    const text = query.trim().toLowerCase();
    const filtered = pool.filter((business) => {
      if (type !== "all" && business.type !== type) return false;
      if (
        text &&
        !`${business.name} ${business.tagline} ${business.owner.name} ${business.tags.join(" ")}`
          .toLowerCase()
          .includes(text)
      ) {
        return false;
      }
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return b.createdAt.localeCompare(a.createdAt);
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      return a.name.localeCompare(b.name);
    });
  }, [pool, type, query, sort]);

  const counts = useMemo(() => {
    const base: Record<TypeFilter, number> = {
      all: pool.length,
      "student-entrepreneur": 0,
      startup: 0,
      "alumni-startup": 0,
      "iic-associated": 0,
      "independent-stall": 0,
    };
    for (const business of pool) base[business.type] += 1;
    return base;
  }, [pool]);

  const featured = pool.filter((business) => business.featured);

  return (
    <div>
      {/* Featured ventures rail */}
      {featured.length > 0 && (
        <div className="mb-12">
          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-pine-700">
            <Icon name="sparkles" size={14} className="text-brass-500" />
            Featured ventures
          </p>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featured.map((business) => (
              <BusinessCard key={business.id} business={business} priority />
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="mb-8 space-y-4 rounded-card border border-paper-200 bg-white p-4 shadow-soft sm:p-5">
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter ventures by type">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={type === tab.value}
              onClick={() => setType(tab.value)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4",
                type === tab.value
                  ? "bg-pine-900 text-white"
                  : "bg-paper-100 text-ink-600 hover:bg-paper-200"
              )}
            >
              {tab.label}
              <span className="ml-1.5 tabular-nums text-[11px] opacity-70">
                {counts[tab.value]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Icon
              name="search"
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search ventures, founders, tags…"
              aria-label="Search startups"
              className="h-11 w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
            />
          </div>
          <div className="sm:w-52">
            <label htmlFor="startup-sort" className="sr-only">
              Sort ventures
            </label>
            <div className="relative">
              <select
                id="startup-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as typeof sort)}
                className="h-11 w-full appearance-none rounded-lg border border-ink-200 bg-white px-3.5 pr-10 text-sm text-ink-900 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
              >
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon
                name="chevron-down"
                size={15}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <p className="mb-5 text-sm text-ink-500" aria-live="polite">
        <span className="font-semibold tabular-nums text-ink-900">
          {results.length}
        </span>{" "}
        venture{results.length === 1 ? "" : "s"}
        {type !== "all" && ` · ${businessTypeLabels[type]}`}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon="search"
          title="No ventures match your search"
          description="Try a different keyword, or browse all venture types."
          actionLabel="Show all ventures"
          actionHref="/startups"
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((business, index) => (
            <div
              key={business.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 9) * 40}ms` }}
            >
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
