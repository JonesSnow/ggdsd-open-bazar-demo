"use client";

import { useState } from "react";
import type { Category } from "@/src/types";
import { categories } from "@/src/data/categories";
import { businesses } from "@/src/data/businesses";
import { Icon } from "@/src/components/ui/icon";
import { Toggle } from "@/src/components/ui/toggle";
import { Badge } from "@/src/components/ui/badge";
import { Panel } from "@/src/components/admin/admin-components";
import { AdminShell } from "@/src/components/admin/admin-shell";
import { cn } from "@/src/utils/cn";

/** Category extended with demo-only visibility state. */
type AdminCategory = Category & { active: boolean };

const toAdminCategory = (category: Category): AdminCategory => ({
  ...category,
  active: true,
});

export default function AdminCategoriesPage() {
  const [items, setItems] = useState<AdminCategory[]>(
    categories.map(toAdminCategory)
  );
  const [featured, setFeatured] = useState<Record<string, boolean>>({});

  const isFeatured = (category: AdminCategory) =>
    featured[category.id] ?? category.featured;
  const countFor = (category: AdminCategory) =>
    businesses.filter((business) =>
      business.categoryIds.includes(category.id)
    ).length;

  const toggleFeatured = (id: string, checked: boolean) => {
    setFeatured((current) => ({ ...current, [id]: checked }));
  };

  const move = (id: string, direction: -1 | 1) => {
    setItems((current) => {
      const index = current.findIndex((category) => category.id === id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const addCategory = () => {
    setItems((current) => [
      ...current,
      {
        id: `cat-new-${current.length + 1}`,
        name: "New category",
        slug: `new-category-${current.length + 1}`,
        description: "Describe this category…",
        artSlug: "design",
        businessCount: 0,
        featured: false,
        order: current.length + 1,
        active: true,
      },
    ]);
  };

  return (
    <AdminShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
            Categories
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            The directory taxonomy. Reorder, feature or retire categories —
            changes are simulated for the demo.
          </p>
        </div>
        <button
          type="button"
          onClick={addCategory}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-pine-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
        >
          <Icon name="plus" size={16} />
          Add category
        </button>
      </div>

      <Panel title={`${items.length} categories`} subtitle="Order determines homepage and filter order">
        <ul className="space-y-3">
          {items.map((category, index) => (
            <li
              key={category.id}
              className={cn(
                "rounded-xl border border-paper-200 bg-white p-4 transition-opacity",
                !category.active && "opacity-60"
              )}
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label={`Move ${category.name} up`}
                    disabled={index === 0}
                    onClick={() => move(category.id, -1)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-paper-100 disabled:opacity-30"
                  >
                    <Icon name="chevron-up" size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${category.name} down`}
                    disabled={index === items.length - 1}
                    onClick={() => move(category.id, 1)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink-500 transition-colors hover:bg-paper-100 disabled:opacity-30"
                  >
                    <Icon name="chevron-down" size={16} />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-base font-semibold text-ink-950">
                      {category.name}
                    </span>
                    {isFeatured(category) && (
                      <Badge variant="brass" dot>
                        Featured
                      </Badge>
                    )}
                    {!category.active && <Badge variant="outline">Hidden</Badge>}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-500">
                    {category.description} ·{" "}
                    <span className="tabular-nums">
                      {countFor(category)} listing{countFor(category) === 1 ? "" : "s"}
                    </span>
                  </p>
                </div>

                <div className="flex w-full flex-col gap-1 sm:w-56">
                  <Toggle
                    label="Featured"
                    checked={isFeatured(category)}
                    onChange={(checked) => toggleFeatured(category.id, checked)}
                  />
                  <Toggle
                    label="Visible in directory"
                    checked={category.active}
                    onChange={() =>
                      setItems((current) =>
                        current.map((item) =>
                          item.id === category.id
                            ? { ...item, active: !item.active }
                            : item
                        )
                      )
                    }
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-lg bg-paper-100 px-4 py-3 text-xs text-ink-500">
          Demo note: reordering and toggles live in local state only. The
          production panel would sync these to the catalog service used by the
          public directory pages.
        </p>
      </Panel>
    </AdminShell>
  );
}
