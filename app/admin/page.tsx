import Link from "next/link";
import { businesses } from "@/src/data/businesses";
import { categories } from "@/src/data/categories";
import {
  adminRegistrations,
  adminReviewReports,
  adminStats,
  registrationMonthly,
} from "@/src/data/admin";
import { Icon } from "@/src/components/ui/icon";
import { Badge } from "@/src/components/ui/badge";
import {
  BarChart,
  Distribution,
  Panel,
  StatCard,
} from "@/src/components/admin/admin-components";
import { AdminShell } from "@/src/components/admin/admin-shell";
import { businessTypeLabels } from "@/src/data/site";

export default function AdminDashboardPage() {
  const categoryDistribution = categories.map((category) => ({
    label: category.name,
    value: businesses.filter((business) =>
      business.categoryIds.includes(category.id)
    ).length,
  }));

  const recentRegistrations = adminRegistrations.slice(0, 5);
  const recentReports = adminReviewReports.filter(
    (report) => report.status === "pending"
  );

  return (
    <AdminShell>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink-950">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            A read-mostly overview of the directory — all numbers below are
            illustrative demo data.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-pine-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-pine-800"
        >
          <Icon name="plus" size={16} />
          New registration
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon="store"
          label="Registered businesses"
          value={String(adminStats.totalBusinesses)}
          delta="+3 this month"
        />
        <StatCard
          icon="inbox"
          label="Pending registrations"
          value={String(adminStats.pendingRegistrations)}
          delta="Needs review"
          deltaTone="warning"
        />
        <StatCard
          icon="star"
          label="Total reviews"
          value={String(adminStats.totalReviews)}
          delta="+18 this week"
        />
        <StatCard
          icon="eye"
          label="Profile views (30d)"
          value={adminStats.profileViews.toLocaleString("en-IN")}
          delta="+12.4%"
        />
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          title="Registrations trend"
          subtitle="New ventures registered per month"
          action={
            <Badge variant="pine" dot>
              Apr – Sep 2026
            </Badge>
          }
        >
          <BarChart data={registrationMonthly.map((entry) => ({ label: entry.month, value: entry.count }))} />
        </Panel>
        <Panel title="Listings by category" subtitle="Where registered businesses cluster">
          <Distribution
            items={categoryDistribution.map((item, index) => ({
              ...item,
              tone:
                index % 3 === 0
                  ? undefined
                  : index % 3 === 1
                    ? "#8A6A2F"
                    : "#234738",
            }))}
          />
        </Panel>
      </div>

      {/* Tables row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel
          title="Latest registrations"
          subtitle="Most recent vendor applications"
          action={
            <Link
              href="/admin/registrations"
              className="inline-flex items-center gap-1 text-sm font-medium text-pine-700 hover:underline underline-offset-4"
            >
              View all
              <Icon name="arrow-right" size={14} />
            </Link>
          }
        >
          <ul className="divide-y divide-paper-200">
            {recentRegistrations.map((registration) => (
              <li key={registration.id} className="flex items-center gap-3 py-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-100 font-display text-sm font-semibold text-pine-700">
                  {registration.businessName.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">
                    {registration.businessName}
                  </p>
                  <p className="truncate text-xs text-ink-500">
                    {registration.applicantName} ·{" "}
                    {businessTypeLabels[registration.type]}
                  </p>
                </div>
                <StatusPill status={registration.status} />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Pending review reports"
          subtitle="Community-flagged reviews awaiting moderation"
          action={
            <Link
              href="/admin/reviews"
              className="inline-flex items-center gap-1 text-sm font-medium text-pine-700 hover:underline underline-offset-4"
            >
              Moderate
              <Icon name="arrow-right" size={14} />
            </Link>
          }
        >
          {recentReports.length === 0 ? (
            <p className="py-6 text-center text-sm text-ink-500">
              No pending reports. The queue is clear.
            </p>
          ) : (
            <ul className="divide-y divide-paper-200">
              {recentReports.map((report) => (
                <li key={report.id} className="py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-medium text-ink-900">
                      {report.businessName}
                    </p>
                    <Badge variant="warning" dot>
                      {report.reason}
                    </Badge>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-500">
                    “{report.excerpt}”
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            href: "/admin/vendors",
            icon: "settings" as const,
            title: "Manage vendors",
            description: "Search, verify or suspend listings.",
          },
          {
            href: "/admin/featured",
            icon: "sparkles" as const,
            title: "Curate featured",
            description: "Pin the best listings to the homepage.",
          },
          {
            href: "/admin/categories",
            icon: "layout-grid" as const,
            title: "Tune categories",
            description: "Reorder and group the directory taxonomy.",
          },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group rounded-card bg-white p-5 shadow-soft ring-1 ring-paper-200 transition-all hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine-50 text-pine-700 transition-colors group-hover:bg-pine-700 group-hover:text-white">
              <Icon name={action.icon} size={19} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink-950">
              {action.title}
            </h2>
            <p className="mt-1 text-sm text-ink-500">{action.description}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}

function StatusPill({ status }: { status: string }) {
  const map = {
    pending: "warning" as const,
    "under-review": "pine" as const,
    approved: "success" as const,
    rejected: "error" as const,
    resolved: "success" as const,
    dismissed: "outline" as const,
  } as const;
  const variant = map[status as keyof typeof map] ?? "outline";
  const label =
    status === "under-review" ? "Under review" : status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <Badge variant={variant} dot>
      {label}
    </Badge>
  );
}
