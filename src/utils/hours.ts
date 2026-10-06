import type { BusinessHours, Location, Weekday } from "@/src/types";

const WEEKDAY_ORDER: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const toMinutes = (time: string): number => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Determines whether a location is open right now, based on the
 * visitor's local weekday and time. Returns a short label.
 */
export function getOpenStatus(location: Location): {
  open: boolean;
  label: string;
} {
  const now = new Date();
  const day = WEEKDAY_ORDER[now.getDay()];
  const minutes = now.getHours() * 60 + now.getMinutes();

  const today = location.hours.find(
    (entry: BusinessHours) => entry.day === day
  );

  if (!today || today.closed) {
    const next = findNextOpenDay(location, now.getDay());
    return {
      open: false,
      label: next ? `Closed · opens ${next}` : "Closed today",
    };
  }

  const openMin = toMinutes(today.open);
  const closeMin = toMinutes(today.close);

  if (minutes >= openMin && minutes < closeMin) {
    return { open: true, label: `Open now · till ${formatTime(today.close)}` };
  }

  if (minutes < openMin) {
    return { open: false, label: `Closed · opens ${formatTime(today.open)}` };
  }

  const next = findNextOpenDay(location, now.getDay());
  return {
    open: false,
    label: next ? `Closed · opens ${next}` : "Closed for today",
  };
}

function findNextOpenDay(location: Location, currentDay: number): string | null {
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = WEEKDAY_ORDER[(currentDay + offset) % 7];
    const entry = location.hours.find(
      (hours: BusinessHours) => hours.day === nextDay && !hours.closed
    );
    if (entry) {
      const dayName =
        offset === 1
          ? "tomorrow"
          : `${nextDay.charAt(0).toUpperCase()}${nextDay.slice(1)}`;
      return `${dayName} ${formatTime(entry.open)}`;
    }
  }
  return null;
}

function formatTime(time: string): string {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, "0")} ${period}`;
}

/** Human-friendly hours summary: "Mon–Fri 9 AM – 5 PM · Sat 10 AM – 2 PM" */
export function summarizeHours(location: Location): string {
  const groups: { days: Weekday[]; open: string; close: string }[] = [];
  for (const entry of location.hours) {
    if (entry.closed) continue;
    const last = groups[groups.length - 1];
    if (last && last.open === entry.open && last.close === entry.close) {
      last.days.push(entry.day);
    } else {
      groups.push({ days: [entry.day], open: entry.open, close: entry.close });
    }
  }
  return groups
    .map((group) => {
      const days = group.days.map((day) => day.slice(0, 3));
      const range =
        days.length > 1
          ? `${days[0]}–${days[days.length - 1]}`
          : days[0];
      return `${range} ${formatTime(group.open)} – ${formatTime(group.close)}`;
    })
    .join(" · ");
}
