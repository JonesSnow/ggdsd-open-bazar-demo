import { cn } from "@/src/utils/cn";

/**
 * Open Bazar brand mark — a market archway.
 */
export function LogoMark({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Open Bazar logo"
      className={cn("shrink-0", className)}
    >
      <rect width="64" height="64" rx="14" fill="#0C1F17" />
      <path
        d="M14 44 C 14 28 24 20 32 20 C 40 20 50 28 50 44 Z"
        fill="#F4E8CE"
      />
      <path d="M22 44 L22 32 A 10 10 0 0 1 42 32 L42 44 Z" fill="#C99B3E" />
    </svg>
  );
}

export function Logo({
  size = 36,
  orientation = "horizontal",
  inverse = false,
  className,
}: {
  size?: number;
  orientation?: "horizontal" | "stacked";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        orientation === "stacked" && "flex-col gap-2 text-center",
        className
      )}
    >
      <LogoMark size={size} />
      <span
        className={cn(
          "flex flex-col leading-none",
          orientation === "stacked" && "items-center"
        )}
      >
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-tight",
            inverse ? "text-paper-50" : "text-ink-950"
          )}
        >
          Open Bazar
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-semibold uppercase tracking-[0.22em]",
            inverse ? "text-brass-300" : "text-pine-700"
          )}
        >
          GGDSD College · IIC
        </span>
      </span>
    </span>
  );
}
