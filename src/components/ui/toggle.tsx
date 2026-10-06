import { cn } from "@/src/utils/cn";

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "group flex w-full items-center justify-between gap-4 rounded-lg px-1 py-1 text-left",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <span>
        <span className="block text-sm font-medium text-ink-800">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-ink-500">
            {description}
          </span>
        )}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-pine-600" : "bg-ink-200 group-hover:bg-ink-300"
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
