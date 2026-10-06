"use client";

import { useMemo, useState } from "react";
import type { AdminRegistration } from "@/src/types";
import { adminRegistrations } from "@/src/data/admin";
import { businessTypeLabels } from "@/src/data/site";
import { Icon } from "@/src/components/ui/icon";
import { Badge } from "@/src/components/ui/badge";
import { Panel } from "@/src/components/admin/admin-components";
import { AdminShell } from "@/src/components/admin/admin-shell";
import { cn } from "@/src/utils/cn";

type Status = AdminRegistration["status"];
type Filter = "all" | Status;

const TABS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "under-review", label: "Under review" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<AdminRegistration[]>(adminRegistrations);
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const base: Record<Filter, number> = {
      all: registrations.length,
      pending: 0,
      "under-review": 0,
      approved: 0,
      rejected: 0,
    };
    for (const registration of registrations) base[registration.status] += 1;
    return base;
  }, [registrations]);

  const filtered = registrations.filter((registration) => {
    if (filter !== "all" && registration.status !== filter) return false;
    const text = query.trim().toLowerCase();
    if (
      text &&
      !`${registration.businessName} ${registration.applicantName} ${registration.applicantEmail}`
        .toLowerCase()
        .includes(text)
    ) {
      return false;
    }
    return true;
  });

  const setStatus = (id: string, status: Status) => {
    setRegistrations((current) =>
      current.map((registration) =>
        registration.id === id ? { ...registration, status } : registration
      )
    );
  };

  return (
    <AdminShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
            Registrations
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Vendor applications from the public registration form. Actions here
            are simulated for the demo.
          </p>
        </div>
        <Badge variant="warning" dot size="md">
          {counts.pending} awaiting decision
        </Badge>
      </div>

      {/* Controls */}
      <Panel title="Filter applications" className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Registration status filter">
            {TABS.map((tab) => (
              <button
                key={tab.value}
                role="tab"
                aria-selected={filter === tab.value}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  filter === tab.value
                    ? "bg-pine-900 text-white"
                    : "bg-paper-100 text-ink-600 hover:bg-paper-200"
                )}
              >
                {tab.label}
                <span className="ml-1.5 tabular-nums opacity-70">{counts[tab.value]}</span>
              </button>
            ))}
          </div>
          <div className="relative lg:w-72">
            <Icon name="search" size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search business, applicant or email…"
              aria-label="Search registrations"
              className="h-10 w-full rounded-lg border border-ink-200 bg-white pl-9 pr-3.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20"
            />
          </div>
        </div>
      </Panel>

      {/* Queue */}
      {filtered.length === 0 ? (
        <Panel title="Nothing to show">
          <div className="py-12 text-center">
            <Icon name="check-circle" size={32} className="mx-auto text-pine-500" />
            <p className="mt-3 text-sm font-medium text-ink-700">Nothing in this view.</p>
            <p className="mt-1 text-xs text-ink-500">Adjust the filter or search to see more applications.</p>
          </div>
        </Panel>
      ) : (
        <ul className="space-y-4">
          {filtered.map((registration) => (
            <RegistrationCard
              key={registration.id}
              registration={registration}
              onStatus={(status) => setStatus(registration.id, status)}
            />
          ))}
        </ul>
      )}
    </AdminShell>
  );
}

function RegistrationCard({
  registration,
  onStatus,
}: {
  registration: AdminRegistration;
  onStatus: (status: Status) => void;
}) {
  const decided = registration.status === "approved" || registration.status === "rejected";
  return (
    <li className="rounded-card bg-white p-5 shadow-soft ring-1 ring-paper-200 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pine-50 font-display text-lg font-semibold text-pine-700">
            {registration.businessName.charAt(0)}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-display text-lg font-semibold text-ink-950">
                {registration.businessName}
              </h2>
              <StatusBadge status={registration.status} />
            </div>
            <p className="mt-0.5 text-sm text-ink-500">
              {registration.applicantName} ·{" "}
              <a
                href={`mailto:${registration.applicantEmail}`}
                className="text-pine-700 hover:underline underline-offset-4"
              >
                {registration.applicantEmail}
              </a>
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline">{businessTypeLabels[registration.type]}</Badge>
              <Badge variant="pine">{registration.category}</Badge>
              <Badge variant="outline">Submitted {registration.submittedAt}</Badge>
            </div>
          </div>
        </div>
      </div>

      {registration.notes && (
        <p className="mt-4 rounded-lg bg-warning-100/60 px-4 py-3 text-xs leading-relaxed text-warning-800">
          <span className="font-semibold">Coordinator note:</span>{" "}
          {registration.notes}
        </p>
      )}

      {!decided ? (
        <div className="mt-5 flex flex-wrap gap-2.5 border-t border-paper-200 pt-4">
          <button
            type="button"
            onClick={() => onStatus("approved")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-pine-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
          >
            <Icon name="check" size={15} />
            Approve listing
          </button>
          <button
            type="button"
            onClick={() => onStatus("under-review")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-4 text-sm font-semibold text-ink-700 transition-colors hover:bg-paper-100"
          >
            <Icon name="eye" size={15} />
            Mark under review
          </button>
          <button
            type="button"
            onClick={() => onStatus("rejected")}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-error-300 bg-white px-4 text-sm font-semibold text-error-700 transition-colors hover:bg-error-100"
          >
            <Icon name="x" size={15} />
            Reject
          </button>
        </div>
      ) : (
        <p className="mt-5 border-t border-paper-200 pt-4 text-xs text-ink-400">
          Decision recorded in this demo session —{" "}
          <span className="font-medium text-ink-600">{registration.status}</span>.
          {registration.status === "approved" && " The listing would now appear in the public directory."}
          {registration.status === "rejected" && " The applicant would be asked to resubmit with corrections."}
        </p>
      )}
    </li>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map = {
    pending: "warning" as const,
    "under-review": "pine" as const,
    approved: "success" as const,
    rejected: "error" as const,
  } as const;
  const label =
    status === "under-review" ? "Under review" : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge variant={map[status]} dot>
      {label}
    </Badge>
  );
}
