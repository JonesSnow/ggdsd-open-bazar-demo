import type { ReactNode } from "react";
import { cn } from "@/src/utils/cn";
import { Icon, type IconName } from "../ui/icon";

export function StatCard({
  label,
  value,
  delta,
  deltaTone = "positive",
  icon,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral" | "warning";
  icon: IconName;
  className?: string;
}) {
  return (
    <div className={cn("rounded-card bg-white p-5 shadow-soft ring-1 ring-paper-200", className)}>
      <div className="flex items-start justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pine-50 text-pine-700">
          <Icon name={icon} size={19} />
        </span>
        {delta && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-semibold",
              deltaTone === "positive" && "bg-success-100 text-success-700",
              deltaTone === "negative" && "bg-error-100 text-error-700",
              deltaTone === "warning" && "bg-warning-100 text-warning-700",
              deltaTone === "neutral" && "bg-paper-100 text-ink-500"
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink-950 tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-sm text-ink-500">{label}</p>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-card bg-white shadow-soft ring-1 ring-paper-200", className)}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-paper-200 px-5 py-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-950">
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-ink-500">{subtitle}</p>}
        </div>
        {action}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

/** Simple SVG bar chart for the dashboard. */
export function BarChart({
  data,
  className,
}: {
  data: { label: string; value: number }[];
  className?: string;
}) {
  const max = Math.max(...data.map((entry) => entry.value), 1);
  return (
    <div className={className}>
      <div className="flex h-44 items-end gap-3 sm:gap-5" role="img" aria-label={`Bar chart: ${data.map((entry) => `${entry.label} ${entry.value}`).join(", ")}`}>
        {data.map((entry, index) => (
          <div key={entry.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold tabular-nums text-ink-700">
              {entry.value}
            </span>
            <div
              className={cn(
                "w-full max-w-12 rounded-t-lg transition-all duration-500",
                index === data.length - 1 ? "bg-brass-500" : "bg-pine-600"
              )}
              style={{ height: `${Math.max(6, (entry.value / max) * 100)}%` }}
            />
            <span className="text-xs text-ink-500">{entry.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Horizontal distribution list (category share etc.) */
export function Distribution({
  items,
}: {
  items: { label: string; value: number; tone?: string }[];
}) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-baseline justify-between text-sm">
            <span className="font-medium text-ink-700">{item.label}</span>
            <span className="tabular-nums text-ink-500">{item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-paper-200">
            <div
              className="h-full rounded-full bg-pine-600 transition-[width] duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: item.tone,
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
