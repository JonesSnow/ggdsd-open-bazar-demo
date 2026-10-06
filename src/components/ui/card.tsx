import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outlined" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  children: ReactNode;
}

const variants = {
  elevated: "bg-white shadow-soft border border-paper-200",
  outlined: "bg-white border border-ink-200/80",
  flat: "bg-white",
} as const;

const paddings = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-7",
} as const;

export function Card({
  variant = "elevated",
  padding = "none",
  hover = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card",
        variants[variant],
        paddings[padding],
        hover &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
