import type { IconName } from "./icon";
import { Icon } from "./icon";
import { ButtonLink } from "./button";
import { cn } from "@/src/utils/cn";

export function EmptyState({
  icon = "search",
  title,
  description,
  actionLabel,
  actionHref,
  className,
}: {
  icon?: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-card border border-dashed border-ink-200 bg-white px-8 py-16 text-center",
        className
      )}
    >
      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-pine-50 text-pine-600">
        <Icon name={icon} size={26} strokeWidth={1.8} />
      </span>
      <h3 className="font-display text-xl font-medium text-ink-950">
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-500">
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <ButtonLink variant="outline" size="sm" href={actionHref} className="mt-6">
          {actionLabel}
        </ButtonLink>
      )}
    </div>
  );
}
