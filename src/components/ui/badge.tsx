import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/utils/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "pine" | "brass" | "outline" | "ink" | "success" | "error" | "warning";
  size?: "sm" | "md";
  dot?: boolean;
  children: ReactNode;
}

const variants = {
  pine: "bg-pine-100 text-pine-800",
  brass: "bg-brass-100 text-brass-800",
  outline: "bg-white text-ink-600 border border-ink-200",
  ink: "bg-ink-900 text-white",
  success: "bg-success-100 text-success-700",
  error: "bg-error-100 text-error-700",
  warning: "bg-warning-100 text-warning-700",
} as const;

const dotVariants = {
  pine: "bg-pine-600",
  brass: "bg-brass-600",
  outline: "bg-ink-400",
  ink: "bg-white",
  success: "bg-success-600",
  error: "bg-error-600",
  warning: "bg-warning-600",
} as const;

export function Badge({
  variant = "pine",
  size = "sm",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full", dotVariants[variant])}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
