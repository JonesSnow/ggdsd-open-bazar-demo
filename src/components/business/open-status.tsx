"use client";

import { useCurrentMinute } from "@/src/hooks";
import { getLocationById } from "@/src/data/locations";
import { getOpenStatus } from "@/src/utils/hours";
import { cn } from "@/src/utils/cn";

export function OpenStatus({
  locationId,
  className,
}: {
  locationId: string;
  className?: string;
}) {
  const minute = useCurrentMinute();
  const location = getLocationById(locationId);
  if (!location) return null;

  const status =
    minute === 0
      ? { open: false, label: "Checking hours…" }
      : getOpenStatus(location, new Date(minute));

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        status.open ? "text-success-700" : "text-ink-500",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status.open ? "bg-success-500" : "bg-ink-300"
        )}
        aria-hidden="true"
      />
      {status.label}
    </span>
  );
}
