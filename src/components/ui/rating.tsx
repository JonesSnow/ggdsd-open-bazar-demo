import { cn } from "@/src/utils/cn";
import { Icon } from "./icon";

/**
 * Accessible star rating. Filled/partial stars are rendered
 * with a clipped overlay for fractional values.
 */
export function Rating({
  value,
  max = 5,
  size = 16,
  className,
  showValue = false,
}: {
  value: number;
  max?: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  const clamped = Math.max(0, Math.min(value, max));
  const fullStars = Math.floor(clamped);
  const hasPartial = clamped - fullStars >= 0.25 && clamped - fullStars < 0.75;

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${value.toFixed(1)} out of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < fullStars || (i === fullStars && hasPartial);
        return (
          <span key={i} className="relative inline-block" aria-hidden="true">
            <Icon
              name="star"
              size={size}
              className="text-ink-200"
              filled
            />
            {filled && (
              <span
                className="absolute inset-0 overflow-hidden text-brass-500"
                style={{
                  width:
                    i < fullStars
                      ? "100%"
                      : `${Math.round((clamped - fullStars) * 100)}%`,
                }}
              >
                <Icon name="star" size={size} filled />
              </span>
            )}
          </span>
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-sm font-semibold text-ink-800 tabular-nums">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}

/** Compact rating with count: ★★★★★ 4.8 (81) */
export function RatingSummary({
  rating,
  reviewCount,
  size = 14,
  className,
}: {
  rating: number;
  reviewCount: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm text-ink-600",
        className
      )}
    >
      <Rating value={rating} size={size} />
      <span className="font-semibold text-ink-800 tabular-nums">
        {rating.toFixed(1)}
      </span>
      <span aria-hidden="true" className="text-ink-300">
        ·
      </span>
      <span className="tabular-nums">
        {reviewCount} review{reviewCount === 1 ? "" : "s"}
      </span>
    </span>
  );
}
