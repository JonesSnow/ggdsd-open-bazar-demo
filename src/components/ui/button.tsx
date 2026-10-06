import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/utils/cn";
import { Icon, type IconName } from "./icon";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "light";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-pine-700 text-white hover:bg-pine-800 active:bg-pine-900 shadow-sm",
  secondary:
    "bg-pine-50 text-pine-800 hover:bg-pine-100 active:bg-pine-200 border border-pine-200",
  outline:
    "bg-white text-ink-800 border border-ink-200 hover:border-ink-300 hover:bg-paper-100 active:bg-paper-200",
  ghost: "text-ink-600 hover:text-ink-900 hover:bg-ink-100/70",
  dark: "bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950",
  light: "bg-white text-ink-900 hover:bg-paper-100 shadow-sm",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2 rounded-lg",
  icon: "h-10 w-10 rounded-lg",
};

const base =
  "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-600 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const iconOnly = size === "icon" || (!children && icon);

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        base,
        variants[variant],
        iconOnly ? "h-10 w-10 rounded-lg" : sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
      ) : (
        icon && iconPosition === "left" && (
          <Icon name={icon} size={size === "lg" ? 20 : 18} strokeWidth={2.2} />
        )
      )}
      {children && <span className="truncate">{children}</span>}
      {icon && iconPosition === "right" && !loading && (
        <Icon name={icon} size={size === "lg" ? 20 : 18} strokeWidth={2.2} />
      )}
    </button>
  );
}

export interface ButtonLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children?: ReactNode;
}

/** An anchor styled exactly like a Button — valid nested markup. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const iconOnly = size === "icon" || (!children && icon);

  return (
    <a
      href={href}
      className={cn(
        base,
        variants[variant],
        iconOnly ? "h-10 w-10 rounded-lg" : sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <Icon name={icon} size={size === "lg" ? 20 : 18} strokeWidth={2.2} />
      )}
      {children && <span className="truncate">{children}</span>}
      {icon && iconPosition === "right" && (
        <Icon name={icon} size={size === "lg" ? 20 : 18} strokeWidth={2.2} />
      )}
    </a>
  );
}
