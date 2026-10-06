import { cn } from "@/src/utils/cn";

export function Stat({
  value,
  label,
  suffix,
  className,
}: {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold tracking-tight text-ink-950 tabular-nums sm:text-4xl">
          {value}
        </span>
        {suffix && (
          <span className="font-display text-xl font-medium text-pine-700">
            {suffix}
          </span>
        )}
      </div>
      <span className="text-sm text-ink-500">{label}</span>
    </div>
  );
}

/** Horizontal bar used in rating breakdowns and admin charts. */
export function Meter({
  value,
  max = 5,
  className,
  barClassName,
}: {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
}) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <span
      className={cn(
        "block h-1.5 w-full overflow-hidden rounded-full bg-ink-100",
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <span
        className={cn(
          "block h-full rounded-full bg-pine-600 transition-[width] duration-500",
          barClassName
        )}
        style={{ width: `${percent}%` }}
      />
    </span>
  );
}
