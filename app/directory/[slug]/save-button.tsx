"use client";

import { useCallback, useSyncExternalStore } from "react";
import { cn } from "@/src/utils/cn";
import { Icon } from "@/src/components/ui/icon";

const STORAGE_KEY = "openbazar:saved";
const CHANGE_EVENT = "openbazar:saved:change";

const readSavedIds = (): string[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

/**
 * Demo "save listing" toggle. Persists to localStorage so the
 * bookmark survives reloads during the demo session. Reads are
 * subscribed via useSyncExternalStore so the state stays in sync
 * with the storage without setState-in-effect.
 */
export function SaveButton({ businessId }: { businessId: string }) {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("storage", onChange);
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(CHANGE_EVENT, onChange);
    };
  }, []);

  const getSnapshot = useCallback(
    () => readSavedIds().includes(businessId),
    [businessId]
  );
  const getServerSnapshot = useCallback(() => false, []);

  const saved = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    try {
      const next = saved
        ? readSavedIds().filter((id) => id !== businessId)
        : [...readSavedIds(), businessId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      /* storage unavailable — demo continues without persistence */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved listings" : "Save this listing"}
      className={cn(
        "inline-flex h-12 items-center gap-2 rounded-lg border px-4 text-sm font-semibold transition-all duration-150 active:scale-[0.97]",
        saved
          ? "border-brass-400 bg-brass-50 text-brass-700"
          : "border-ink-200 bg-white/90 text-ink-700 hover:border-ink-300 hover:bg-white"
      )}
    >
      <Icon
        name="bookmark"
        size={17}
        className={saved ? "fill-brass-500 text-brass-500" : ""}
      />
      {saved ? "Saved" : "Save"}
    </button>
  );
}
