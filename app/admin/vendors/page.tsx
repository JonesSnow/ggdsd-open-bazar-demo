"use client";

import { useMemo, useState } from "react";
import type { Business, BusinessType } from "@/src/types";
import { businesses } from "@/src/data/businesses";
import { categories } from "@/src/data/categories";
import { getLocationById } from "@/src/data/locations";
import { businessTypeLabels } from "@/src/data/site";
import { businessCoverArt } from "@/src/utils/images";
import { getOpenStatus } from "@/src/utils/hours";
import { Icon } from "@/src/components/ui/icon";
import { Badge } from "@/src/components/ui/badge";
import { Toggle } from "@/src/components/ui/toggle";
import { Panel } from "@/src/components/admin/admin-components";
import { AdminShell } from "@/src/components/admin/admin-shell";
import { cn } from "@/src/utils/cn";

type StatusFilter = "all" | "verified" | "featured" | "suspended";

export default function AdminVendorsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState<"all" | BusinessType>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [featured, setFeatured] = useState<Record<string, boolean>>({});
  const [verified, setVerified] = useState<Record<string, boolean>>({});
  const [suspended, setSuspended] = useState<Record<string, boolean>>({});

  const isFeatured = (business: Business) => featured[business.id] ?? business.featured;
  const isVerified = (business: Business) => verified[business.id] ?? business.verified;
  const isSuspended = (business: Business) => Boolean(suspended[business.id]);

  const filtered = useMemo(() => {
    const text = query.trim().toLowerCase();
    return businesses.filter((business) => {
      if (
        text &&
        !`${business.name} ${business.tagline} ${business.owner.name}`
          .toLowerCase()
          .includes(text)
      ) {
        return false;
      }
      if (category !== "all" && !business.categoryIds.includes(category)) {
        return false;
      }
      if (type !== "all" && business.type !== type) return false;
      if (status === "verified" && !(verified[business.id] ?? business.verified)) {
        return false;
      }
      if (status === "featured" && !(featured[business.id] ?? business.featured)) {
        return false;
      }
      if (status === "suspended" && !suspended[business.id]) return false;
      return true;
    });
  }, [query, category, type, status, featured, verified, suspended]);

  const counts = {
    all: businesses.length,
    verified: businesses.filter(
      (business) => verified[business.id] ?? business.verified
    ).length,
    featured: businesses.filter(
      (business) => featured[business.id] ?? business.featured
    ).length,
    suspended: businesses.filter((business) => suspended[business.id]).length,
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
          Vendors
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Search, verify, feature or suspend listings. Toggles are simulated in
          this demo and reset on refresh.
        </p>
      </div>

      {/* Filter bar */}
      <Panel title="Filters" subtitle="Narrow the vendor table" className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label htmlFor="vendor-search" className="mb-1.5 block text-sm font-semibold text-ink-800">
              Search vendors
            </label>
            <div className="relative">
              <Icon name="search" size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                id="vendor-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, tagline or owner…"
                className="h-11 w-full rounded-lg border border-ink-200 bg-white pl-10 pr-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
              />
            </div>
          </div>
          <div>
            <label htmlFor="vendor-category" className="mb-1.5 block text-sm font-semibold text-ink-800">
              Category
            </label>
            <select
              id="vendor-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 text-sm text-ink-900 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20 lg:w-52"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="vendor-type" className="mb-1.5 block text-sm font-semibold text-ink-800">
              Business type
            </label>
            <select
              id="vendor-type"
              value={type}
              onChange={(event) => setType(event.target.value as "all" | BusinessType)}
              className="h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 text-sm text-ink-900 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20 lg:w-52"
            >
              <option value="all">All types</option>
              {(Object.keys(businessTypeLabels) as BusinessType[]).map((key) => (
                <option key={key} value={key}>
                  {businessTypeLabels[key]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Status filter">
          {(
            [
              ["all", "All"],
              ["verified", "Verified"],
              ["featured", "Featured"],
              ["suspended", "Suspended"],
            ] as [StatusFilter, string][]
          ).map(([value, label]) => (
            <button
              key={value}
              role="tab"
              aria-selected={status === value}
              onClick={() => setStatus(value)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                status === value
                  ? "bg-pine-900 text-white"
                  : "bg-paper-100 text-ink-600 hover:bg-paper-200"
              )}
            >
              {label}
              <span className="ml-1.5 tabular-nums opacity-70">{counts[value]}</span>
            </button>
          ))}
        </div>
      </Panel>

      {/* Table */}
      <Panel
        title={`${filtered.length} vendor${filtered.length === 1 ? "" : "s"}`}
        subtitle="Live directory state (simulated)"
      >
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <Icon name="search" size={32} className="mx-auto text-ink-300" />
            <p className="mt-3 text-sm font-medium text-ink-700">No vendors match your filters.</p>
            <p className="mt-1 text-xs text-ink-500">Try widening the search or clearing a filter.</p>
          </div>
        ) : (
          <div className="-mx-5 overflow-x-auto px-5">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-paper-200 text-xs font-semibold uppercase tracking-wider text-ink-400">
                  <th scope="col" className="pb-3 pr-4">Vendor</th>
                  <th scope="col" className="pb-3 pr-4">Type</th>
                  <th scope="col" className="pb-3 pr-4">Status today</th>
                  <th scope="col" className="pb-3 pr-4">Featured</th>
                  <th scope="col" className="pb-3 pr-4">Verified</th>
                  <th scope="col" className="pb-3">Suspend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-200">
                {filtered.map((business) => {
                  const location = getLocationById(business.locationId);
                  const open = location
                    ? getOpenStatus(location)
                    : { open: false, label: "Unknown" };
                  return (
                    <tr key={business.id} className={cn("transition-colors hover:bg-paper-100/50", isSuspended(business) && "opacity-60")}>
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={businessCoverArt(business)}
                            alt=""
                            width={44}
                            height={44}
                            className="h-11 w-11 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-ink-900">{business.name}</p>
                            <p className="truncate text-xs text-ink-500">{business.owner.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 text-ink-600">
                        {businessTypeLabels[business.type]}
                      </td>
                      <td className="py-3.5 pr-4">
                        {isSuspended(business) ? (
                          <Badge variant="error" dot>Suspended</Badge>
                        ) : (
                          <Badge variant={open.open ? "success" : "outline"} dot>
                            {open.open ? "Open now" : "Closed"}
                          </Badge>
                        )}
                      </td>
                      <td className="py-3.5 pr-4">
                        <Toggle
                          label={`Feature ${business.name}`}
                          checked={isFeatured(business)}
                          onChange={(checked) => setFeatured((current) => ({ ...current, [business.id]: checked }))}
                        />
                      </td>
                      <td className="py-3.5 pr-4">
                        <Toggle
                          label={`Verify ${business.name}`}
                          checked={isVerified(business)}
                          onChange={(checked) => setVerified((current) => ({ ...current, [business.id]: checked }))}
                        />
                      </td>
                      <td className="py-3.5">
                        <button
                          type="button"
                          onClick={() => setSuspended((current) => ({ ...current, [business.id]: !isSuspended(business) }))}
                          aria-pressed={isSuspended(business)}
                          className={cn(
                            "inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors",
                            isSuspended(business)
                              ? "bg-success-100 text-success-700 hover:bg-success-200"
                              : "bg-error-100 text-error-700 hover:bg-error-200"
                          )}
                        >
                          <Icon name={isSuspended(business) ? "check" : "x"} size={13} />
                          {isSuspended(business) ? "Restore" : "Suspend"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </AdminShell>
  );
}
