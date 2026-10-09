import type { Location } from "@/src/types";
import { formatTime } from "@/src/utils/format";
import { getCampusWeekday, getOpenStatus, summarizeHours } from "@/src/utils/hours";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { Icon } from "@/src/components/ui/icon";
import { cn } from "@/src/utils/cn";

const DAY_LABELS: Record<Location["hours"][number]["day"], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export function HoursTable({ location }: { location: Location }) {
  const { open } = getOpenStatus(location);
  const today = getCampusWeekday();

  return (
    <Card variant="outlined" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-paper-200 bg-paper-100/50 px-5 py-4">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-950">
          <Icon name="clock" size={18} className="text-pine-700" />
          Visiting hours
        </h3>
        <Badge variant={open ? "success" : "outline"} dot>
          {open ? "Open now" : "Closed"}
        </Badge>
      </div>
      <ul className="divide-y divide-paper-200">
        {location.hours.map((entry) => {
          const isToday = entry.day === today;
          return (
            <li
              key={entry.day}
              className={cn(
                "flex items-center justify-between px-5 py-2.5 text-sm",
                isToday && "bg-pine-50/60 font-medium"
              )}
            >
              <span className="flex items-center gap-2 text-ink-700">
                {DAY_LABELS[entry.day]}
                {isToday && (
                  <span className="rounded-full bg-pine-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Today
                  </span>
                )}
              </span>
              <span className={entry.closed ? "text-ink-400" : "text-ink-600"}>
                {entry.closed
                  ? "Closed"
                  : `${formatTime(entry.open)} – ${formatTime(entry.close)}`}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-paper-200 px-5 py-3 text-xs text-ink-500">
        {summarizeHours(location)}
      </p>
    </Card>
  );
}

export function LocationCard({ location }: { location: Location }) {
  return (
    <Card variant="outlined" className="p-5">
      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-950">
        <Icon name="map-pin" size={18} className="text-pine-700" />
        {location.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-700">
        {location.building}
        {location.floor && ` · ${location.floor}`}
        {location.room && ` · ${location.room}`}
      </p>
      {location.landmark && (
        <p className="mt-1 flex items-start gap-1.5 text-sm text-ink-500">
          <Icon name="compass" size={14} className="mt-0.5 shrink-0" />
          {location.landmark}
        </p>
      )}
      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-500">
          Accessibility
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {location.accessibility.map((feature) => (
            <li
              key={feature}
              className="inline-flex items-center gap-1 rounded-full bg-paper-100 px-2.5 py-1 text-xs text-ink-600"
            >
              <Icon name="check" size={12} className="text-pine-600" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/** Stylised campus map placeholder with the stall highlighted. */
export function MiniMap({ location }: { location: Location }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-paper-200 bg-pine-50">
      <svg
        viewBox="0 0 640 400"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Stylised map showing ${location.name}`}
      >
        {/* campus blocks */}
        <rect x="40" y="50" width="150" height="110" rx="10" fill="#E7E8E4" />
        <rect x="450" y="40" width="150" height="130" rx="10" fill="#E7E8E4" />
        <rect x="60" y="230" width="180" height="110" rx="10" fill="#E7E8E4" />
        <rect x="420" y="240" width="160" height="100" rx="10" fill="#E7E8E4" />
        <rect x="250" y="150" width="140" height="100" rx="10" fill="#DCEBE2" />
        {/* paths */}
        <path d="M0 200 H640" stroke="#DBD8CD" strokeWidth="14" strokeLinecap="round" />
        <path d="M320 0 V400" stroke="#DBD8CD" strokeWidth="14" strokeLinecap="round" />
        <path d="M0 90 C 160 60 480 60 640 95" stroke="#DBD8CD" strokeWidth="10" fill="none" strokeLinecap="round" />
        {/* stall marker */}
        <g transform="translate(320 200)">
          <circle r="34" fill="#2C6B4C" opacity="0.15">
          </circle>
          <circle r="16" fill="#2C6B4C" />
          <circle r="6" fill="#F4E8CE" />
        </g>
        <text x="320" y="262" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="#3E4440">
          {location.name}
        </text>
        <text x="115" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="#8A908B">
          {location.building}
        </text>
      </svg>
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pine-500 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pine-600" />
        </span>
        You are viewing the stall location
      </div>
    </div>
  );
}
