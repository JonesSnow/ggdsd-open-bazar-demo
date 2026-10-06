"use client";

import { useState } from "react";
import type { Business } from "@/src/types";
import { businesses } from "@/src/data/businesses";
import { categories } from "@/src/data/categories";
import { businessCoverArt } from "@/src/utils/images";
import { Icon } from "@/src/components/ui/icon";
import { Badge } from "@/src/components/ui/badge";
import { Rating } from "@/src/components/ui/rating";
import { Toggle } from "@/src/components/ui/toggle";
import { Panel } from "@/src/components/admin/admin-components";
import { AdminShell } from "@/src/components/admin/admin-shell";

export default function AdminFeaturedPage() {
  const [featured, setFeatured] = useState<Record<string, boolean>>({});

  const isFeatured = (business: Business) => featured[business.id] ?? business.featured;

  const featuredList = businesses.filter((business) => isFeatured(business));
  const others = businesses.filter((business) => !isFeatured(business));

  const toggle = (id: string, checked: boolean) => {
    setFeatured((current) => ({ ...current, [id]: checked }));
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
          Featured listings
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Featured listings pin to the homepage showcase and the top of search
          results. {featuredList.length} of {businesses.length} currently featured.
        </p>
      </div>

      {/* Current picks */}
      <Panel
        title="On the homepage now"
        subtitle="Shown in the featured carousel, newest first"
        className="mb-6"
      >
        {featuredList.length === 0 ? (
          <div className="py-10 text-center">
            <Icon name="sparkles" size={30} className="mx-auto text-ink-300" />
            <p className="mt-3 text-sm font-medium text-ink-700">
              Nothing featured right now.
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Feature a listing below to pin it to the homepage.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredList.map((business) => (
              <li
                key={business.id}
                className="group relative overflow-hidden rounded-xl border border-paper-200 bg-white shadow-soft"
              >
                <div className="relative h-28 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={businessCoverArt(business)}
                    alt=""
                    width={400}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
                  <Badge variant="brass" className="absolute left-3 top-3">
                    Featured
                  </Badge>
                </div>
                <div className="p-4">
                  <p className="font-display text-base font-semibold text-ink-950">
                    {business.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-ink-500">
                    <Rating value={business.rating} size={12} />
                    <span className="tabular-nums">
                      {business.rating.toFixed(1)} ({business.reviewCount})
                    </span>
                  </div>
                  <Toggle
                    label="Keep featured"
                    checked
                    onChange={(checked) => toggle(business.id, checked)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {/* Everything else */}
      <Panel title="Remaining listings" subtitle="Toggle to pin a listing to the homepage">
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-paper-200 text-xs font-semibold uppercase tracking-wider text-ink-400">
                <th scope="col" className="pb-3 pr-4">Listing</th>
                <th scope="col" className="pb-3 pr-4">Category</th>
                <th scope="col" className="pb-3 pr-4">Rating</th>
                <th scope="col" className="pb-3">Feature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-paper-200">
              {others.map((business) => (
                <tr key={business.id} className="transition-colors hover:bg-paper-100/50">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={businessCoverArt(business)}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-900">{business.name}</p>
                        <p className="truncate text-xs text-ink-500">{business.tagline}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {business.categoryIds.slice(0, 2).map((categoryId) => {
                        const category = categories.find((item) => item.id === categoryId);
                        return category ? (
                          <Badge key={categoryId} variant="outline">
                            {category.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="py-3 pr-4 tabular-nums text-ink-600">
                    {business.rating.toFixed(1)}
                  </td>
                  <td className="py-3">
                    <Toggle
                      label={`Feature ${business.name}`}
                      checked={false}
                      onChange={() => toggle(business.id, true)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 rounded-lg bg-paper-100 px-4 py-3 text-xs text-ink-500">
          Demo note: featuring is session-local. Production would persist the
          curated set and invalidate the homepage cache automatically.
        </p>
      </Panel>
    </AdminShell>
  );
}
