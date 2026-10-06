import { cn } from "@/src/utils/cn";

/**
 * A small interactive tag used for filtering.
 */
export function Chip({
  label,
  active = false,
  onClick,
  className,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-all duration-150",
        "active:scale-[0.97]",
        active
          ? "border-pine-700 bg-pine-700 text-white shadow-sm"
          : "border-ink-200 bg-white text-ink-700 hover:border-pine-400 hover:text-pine-700",
        className
      )}
    >
      {label}
    </button>
  );
}
