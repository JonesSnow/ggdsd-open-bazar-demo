"use client";

import { useState } from "react";
import type { AdminReviewReport } from "@/src/types";
import { adminReviewReports } from "@/src/data/admin";
import { businesses } from "@/src/data/businesses";
import { Icon } from "@/src/components/ui/icon";
import { Badge } from "@/src/components/ui/badge";
import { Rating } from "@/src/components/ui/rating";
import { Panel } from "@/src/components/admin/admin-components";
import { AdminShell } from "@/src/components/admin/admin-shell";
import { cn } from "@/src/utils/cn";

type Status = AdminReviewReport["status"];
type Filter = "all" | Status;

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All reports" },
  { value: "pending", label: "Pending" },
  { value: "resolved", label: "Resolved" },
  { value: "dismissed", label: "Dismissed" },
];

export default function AdminReviewsPage() {
  const [reports, setReports] = useState<AdminReviewReport[]>(adminReviewReports);
  const [filter, setFilter] = useState<Filter>("all");

  const counts: Record<Filter, number> = {
    all: reports.length,
    pending: reports.filter((report) => report.status === "pending").length,
    resolved: reports.filter((report) => report.status === "resolved").length,
    dismissed: reports.filter((report) => report.status === "dismissed").length,
  };

  const filtered = reports.filter((report) => filter === "all" || report.status === filter);

  const setStatus = (id: string, status: Status) => {
    setReports((current) =>
      current.map((report) => (report.id === id ? { ...report, status } : report))
    );
  };

  const latestReviews = businesses
    .flatMap((business) =>
      business.reviews.map((review) => ({
        businessName: business.name,
        author: review.authorName,
        rating: review.rating,
        date: review.date,
        content: review.content,
      }))
    )
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 6);

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
          Reviews &amp; reports
        </h1>
        <p className="mt-1 text-sm text-ink-500">
          Moderate community-flagged reviews and inspect the newest ratings. Demo
          actions apply to this session only.
        </p>
      </div>

      {/* Report queue */}
      <Panel
        title="Moderation queue"
        subtitle="Reviews flagged by visitors"
        className="mb-8"
        action={
          <div className="flex gap-1.5" role="tablist" aria-label="Report status filter">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={filter === tab.value}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  filter === tab.value
                    ? "bg-pine-900 text-white"
                    : "bg-paper-100 text-ink-600 hover:bg-paper-200"
                )}
              >
                {tab.label}
                <span className="ml-1 tabular-nums opacity-70">{counts[tab.value]}</span>
              </button>
            ))}
          </div>
        }
      >
        {filtered.length === 0 ? (
          <div className="py-10 text-center">
            <Icon name="flag" size={30} className="mx-auto text-ink-300" />
            <p className="mt-3 text-sm font-medium text-ink-700">No reports in this view.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {filtered.map((report) => (
              <li
                key={report.id}
                className="rounded-xl border border-paper-200 bg-white p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-base font-semibold text-ink-950">
                        {report.businessName}
                      </h2>
                      <Badge
                        variant={
                          report.status === "pending"
                            ? "warning"
                            : report.status === "resolved"
                              ? "success"
                              : "outline"
                        }
                        dot
                      >
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-ink-500">
                      {report.reviewer} · {report.reportedAt}
                    </p>
                  </div>
                  <Badge variant="error">{report.reason}</Badge>
                </div>

                <blockquote className="mt-4 rounded-lg bg-paper-100/70 px-4 py-3 text-sm leading-relaxed text-ink-700">
                  “{report.excerpt}”
                </blockquote>
                <div className="mt-2 flex items-center gap-2 text-xs text-ink-500">
                  <Rating value={report.rating} size={12} />
                  <span>Reported rating</span>
                </div>

                {report.status === "pending" ? (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-paper-200 pt-4">
                    <button
                      type="button"
                      onClick={() => setStatus(report.id, "resolved")}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-pine-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
                    >
                      <Icon name="check" size={15} />
                      Uphold &amp; remove review
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(report.id, "dismissed")}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:bg-paper-100"
                    >
                      <Icon name="x" size={15} />
                      Dismiss report
                    </button>
                  </div>
                ) : (
                  <p className="mt-4 border-t border-paper-200 pt-3 text-xs text-ink-400">
                    {report.status === "resolved"
                      ? "Resolved in this demo session — the review would be hidden from the public listing."
                      : "Dismissed in this demo session — the review stays public."}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      {/* Latest reviews */}
      <Panel title="Latest published reviews" subtitle="Most recent ratings across all listings">
        <ul className="grid gap-4 md:grid-cols-2">
          {latestReviews.map((review) => (
            <li key={`${review.businessName}-${review.author}`} className="rounded-xl border border-paper-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink-900">{review.businessName}</p>
                  <p className="text-xs text-ink-500">{review.author}</p>
                </div>
                <Rating value={review.rating} size={13} />
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-600">
                “{review.content}”
              </p>
              <p className="mt-3 text-right text-xs tabular-nums text-ink-400">{review.date}</p>
            </li>
          ))}
        </ul>
      </Panel>
    </AdminShell>
  );
}
