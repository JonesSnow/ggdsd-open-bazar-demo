import type { SortKey } from "@/src/types";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Highest rated" },
  { value: "reviews", label: "Most reviewed" },
  { value: "name", label: "Name (A–Z)" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Established" },
];

export function SortSelect({
  value,
  onChange,
  className,
}: {
  value: SortKey;
  onChange: (sort: SortKey) => void;
  className?: string;
}) {
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Sort listings</span>
      <Icon
        name="sliders"
        size={15}
        className="pointer-events-none absolute left-3 text-ink-400"
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as SortKey)}
        className="h-10 w-[164px] appearance-none rounded-lg border border-ink-200 bg-white pl-9 pr-9 text-sm font-medium text-ink-800 transition-colors hover:border-ink-300 focus:border-pine-500 focus:outline-none focus:ring-2 focus:ring-pine-500/20 sm:w-auto"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={14}
        className="pointer-events-none absolute right-3 text-ink-400"
      />
    </label>
  );
}

export function ViewToggle({
  view,
  onChange,
}: {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}) {
  return (
    <div
      role="group"
      aria-label="Change view"
      className="inline-flex rounded-lg border border-ink-200 bg-white p-0.5"
    >
      {(
        [
          { value: "grid", icon: "layout-grid", label: "Grid view" },
          { value: "list", icon: "list", label: "List view" },
        ] as const
      ).map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={view === option.value}
          aria-label={option.label}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors sm:w-9",
            view === option.value
              ? "bg-pine-700 text-white shadow-sm"
              : "text-ink-500 hover:text-ink-800"
          )}
        >
          <Icon name={option.icon} size={16} />
        </button>
      ))}
    </div>
  );
}
