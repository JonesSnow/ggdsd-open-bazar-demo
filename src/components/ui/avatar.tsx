import { cn } from "@/src/utils/cn";

const AVATAR_HUES = [
  "bg-pine-700",
  "bg-brass-600",
  "bg-ink-700",
  "bg-pine-500",
  "bg-brass-700",
  "bg-ink-800",
] as const;

/** Deterministic hue from a string (name). */
function hueFor(name: string): (typeof AVATAR_HUES)[number] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return AVATAR_HUES[Math.abs(hash) % AVATAR_HUES.length];
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function Avatar({
  name,
  size = 40,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none",
        hueFor(name),
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, size * 0.38),
        letterSpacing: "0.02em",
      }}
    >
      {initials(name)}
    </span>
  );
}
