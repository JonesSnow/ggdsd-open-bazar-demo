"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Business, SearchFilters, SortKey } from "@/src/types";
import { applyFilters, countActiveFilters, sortBusinesses } from "@/src/utils/business-queries";
import { useCurrentMinute, useDebounce } from "@/src/hooks";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";
import { BusinessCard, BusinessRow } from "@/src/components/business/business-card";
import { FilterPanel } from "./filter-panel";
import { SortSelect, ViewToggle } from "./view-controls";
import { EmptyState } from "@/src/components/ui/empty-state";

export function ExploreShopsExplorer({
  businesses,
  initialQuery = "",
  initialCategories = [],
  initialFeaturedOnly = false,
  categoryCounts,
}: {
  businesses: Business[];
  initialQuery?: string;
  initialCategories?: string[];
  initialFeaturedOnly?: boolean;
  categoryCounts: Record<string, number>;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const categoryIds = initialCategories.filter((categoryId) =>
      businesses.some((business) => business.categoryIds.includes(categoryId))
    );
    return {
      ...(categoryIds.length ? { categoryIds } : {}),
      ...(initialFeaturedOnly ? { featuredOnly: true } : {}),
    };
  });
  const featuredOnly = Boolean(filters.featuredOnly);
  const [sort, setSort] = useState<SortKey>("rating");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const currentMinute = useCurrentMinute();
  const closeMobileFilters = useCallback(() => setMobileFiltersOpen(false), []);

  const debouncedQuery = useDebounce(query, 200);

  // Keep query, category, and featured selections shareable in the URL.
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedQuery.trim()) params.set("q", debouncedQuery.trim());
    (filters.categoryIds ?? []).forEach((id) => params.append("category", id));
    if (featuredOnly) params.set("featured", "1");
    const qs = params.toString();
    const nextUrl = qs ? `/explore-shops?${qs}` : "/explore-shops";
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (currentUrl !== nextUrl) {
      // Filtering is already handled locally. Replacing the URL directly keeps
      // search shareable without re-rendering the server route or remounting
      // this controlled input while the user is typing.
      window.history.replaceState(null, "", nextUrl);
    }
  }, [debouncedQuery, featuredOnly, filters.categoryIds]);

  const results = useMemo(() => {
    const filtered = applyFilters(businesses, {
      ...filters,
      query: debouncedQuery,
    }, currentMinute ? new Date(currentMinute) : undefined);
    return sortBusinesses(filtered, sort);
  }, [businesses, currentMinute, filters, debouncedQuery, sort]);

  const activeCount = countActiveFilters({
    ...filters,
    query: debouncedQuery,
  });

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilters((current) => ({ ...current }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      {/* Search + toolbar */}
      <div className="sticky top-16 z-dropdown -mx-4 border-b border-paper-200 bg-paper-50/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <form
          onSubmit={handleSearchSubmit}
          role="search"
          aria-label="Filter the directory"
          className="relative max-w-xl"
        >
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search businesses, products, tags…"
            aria-label="Search listings"
            className="h-11 w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 transition-colors hover:border-ink-300 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
          />
        </form>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-600" aria-live="polite">
            <span className="font-semibold text-ink-900 tabular-nums">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "listing" : "listings"}
            {activeCount > 0 && (
              <span className="text-ink-400"> · {activeCount} filter{activeCount === 1 ? "" : "s"} active</span>
            )}
          </p>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <SortSelect value={sort} onChange={setSort} />
            <ViewToggle view={view} onChange={setView} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="relative inline-flex h-10 shrink-0 items-center gap-0 rounded-lg border border-ink-200 bg-white px-2.5 text-sm font-medium text-ink-700 sm:gap-2 sm:px-3.5 lg:hidden"
              aria-controls="mobile-filter-drawer"
              aria-expanded={mobileFiltersOpen}
            >
              <Icon name="filter" size={15} />
              <span className="sr-only sm:not-sr-only">Filters</span>
              {activeCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-pine-700 px-1 text-[10px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop filters */}
        <aside aria-label="Directory filters" className="hidden lg:block">
          <div className="sticky top-40 rounded-card border border-paper-200 bg-white p-5 shadow-soft">
            <FilterPanel
              filters={filters}
              onChange={setFilters}
              onReset={() => {
                setFilters({});
                setQuery("");
              }}
              activeCount={activeCount}
              categoryCounts={categoryCounts}
            />
          </div>
        </aside>

        {/* Results */}
        <div>
          {results.length === 0 ? (
            <EmptyState
              icon="search"
              title="No listings match your filters"
              description="Try broadening the search, clearing a category, or looking in a different campus location."
              actionLabel="Clear all filters"
              actionHref="/explore-shops"
            />
          ) : view === "grid" ? (
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
          ) : (
            <div className="space-y-3">
              {results.map((business, index) => (
                <div
                  key={business.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${Math.min(index, 9) * 30}ms` }}
                >
                  <BusinessRow business={business} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={closeMobileFilters}
        filters={filters}
        onChange={setFilters}
        onReset={() => {
          setFilters({});
          setQuery("");
        }}
        activeCount={activeCount}
        resultCount={results.length}
        categoryCounts={categoryCounts}
      />
    </div>
  );
}

function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  activeCount,
  resultCount,
  categoryCounts,
}: {
  open: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onReset: () => void;
  activeCount: number;
  resultCount: number;
  categoryCounts: Record<string, number>;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const focusableSelector =
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    document.body.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>(focusableSelector)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog?.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      dialog?.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [onClose, open]);

  return (
    <div
      id="mobile-filter-drawer"
      hidden={!open}
      className={cn(
        "fixed inset-0 z-overlay lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/40 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-filter-drawer-title"
        tabIndex={-1}
        className={cn(
          "absolute bottom-0 left-0 right-0 flex max-h-[85vh] flex-col rounded-t-3xl bg-white shadow-float transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-paper-200 px-5 py-4">
          <h2 id="mobile-filter-drawer-title" className="font-display text-lg font-semibold text-ink-950">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-paper-100 hover:text-ink-800"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterPanel
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            activeCount={activeCount}
            categoryCounts={categoryCounts}
          />
        </div>
        <div className="border-t border-paper-200 p-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-pine-700 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
          >
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </button>
        </div>
      </div>
    </div>
  );
}
