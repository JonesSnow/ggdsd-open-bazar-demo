import type { BusinessType, SearchFilters } from "@/src/types";
import { categories } from "@/src/data/categories";
import { locations } from "@/src/data/locations";
import { businessTypeLabels, businessTypeDescriptions } from "@/src/data/site";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";

const TYPES: BusinessType[] = [
  "student-entrepreneur",
  "startup",
  "alumni-startup",
  "independent-stall",
  "iic-associated",
];

const RATING_OPTIONS = [4.5, 4, 3.5, 3];

export function FilterPanel({
  filters,
  onChange,
  onReset,
  activeCount,
}: {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onReset: () => void;
  activeCount: number;
}) {
  const set = (patch: Partial<SearchFilters>) =>
    onChange({ ...filters, ...patch });

  const toggleCategory = (categoryId: string) => {
    const current = filters.categoryIds ?? [];
    const next = current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId];
    set({ categoryIds: next });
  };

  const toggleType = (type: BusinessType) => {
    const current = filters.types ?? [];
    const next = current.includes(type)
      ? current.filter((item) => item !== type)
      : [...current, type];
    set({ types: next });
  };

  return (
    <div className="space-y-7">
      {/* Categories */}
      <fieldset>
        <legend className="mb-3 flex items-center justify-between text-sm font-semibold text-ink-900">
          Categories
        </legend>
        <div className="space-y-1">
          {categories.map((category) => {
            const checked = (filters.categoryIds ?? []).includes(category.id);
            return (
              <label
                key={category.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  checked
                    ? "bg-pine-50 text-pine-900"
                    : "text-ink-600 hover:bg-paper-100"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleCategory(category.id)}
                  className="h-4 w-4 shrink-0 rounded border-ink-300 accent-pine-700"
                />
                <span className="flex-1">{category.name}</span>
                <span className="text-xs tabular-nums text-ink-400">
                  {category.businessCount}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Business type */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-900">
          Listing type
        </legend>
        <div className="space-y-1">
          {TYPES.map((type) => {
            const checked = (filters.types ?? []).includes(type);
            return (
              <label
                key={type}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  checked
                    ? "bg-pine-50 text-pine-900"
                    : "text-ink-600 hover:bg-paper-100"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleType(type)}
                  className="h-4 w-4 shrink-0 rounded border-ink-300 accent-pine-700"
                />
                <span className="flex-1">{businessTypeLabels[type]}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-2 px-2.5 text-xs text-ink-400">
          {businessTypeDescriptions["student-entrepreneur"]}
        </p>
      </fieldset>

      {/* Rating */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-900">
          Minimum rating
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {RATING_OPTIONS.map((rating) => {
            const active = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => set({ minRating: active ? undefined : rating })}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs font-medium transition-colors",
                  active
                    ? "border-pine-700 bg-pine-700 text-white"
                    : "border-ink-200 bg-white text-ink-600 hover:border-pine-400"
                )}
              >
                <Icon name="star" size={12} filled className={active ? "text-brass-300" : "text-brass-500"} />
                {rating}+
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Location */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink-900">
          Campus location
        </legend>
        <div className="space-y-1">
          {locations.map((location) => {
            const checked = filters.locationId === location.id;
            return (
              <label
                key={location.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  checked
                    ? "bg-pine-50 text-pine-900"
                    : "text-ink-600 hover:bg-paper-100"
                )}
              >
                <input
                  type="radio"
                  name="location"
                  checked={checked}
                  onChange={() => set({ locationId: checked ? undefined : location.id })}
                  className="h-4 w-4 shrink-0 border-ink-300 accent-pine-700"
                />
                <span className="flex-1">{location.name}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Toggles */}
      <div className="space-y-2 border-t border-paper-200 pt-5">
        <ToggleFilter
          label="Verified only"
          description="IIC-verified listings"
          checked={Boolean(filters.verifiedOnly)}
          onChange={(checked) => set({ verifiedOnly: checked })}
        />
        <ToggleFilter
          label="Open now"
          description="Open at your local time"
          checked={Boolean(filters.openNow)}
          onChange={(checked) => set({ openNow: checked })}
        />
      </div>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-error-500 hover:text-error-600"
        >
          <Icon name="rotate-ccw" size={15} />
          Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
        </button>
      )}
    </div>
  );
}

function ToggleFilter({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-paper-100"
    >
      <span>
        <span className="block text-sm font-medium text-ink-700">{label}</span>
        <span className="block text-xs text-ink-400">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-pine-600" : "bg-ink-200"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}
