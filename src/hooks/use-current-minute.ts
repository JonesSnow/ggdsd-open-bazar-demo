"use client";

import { useSyncExternalStore } from "react";

const MINUTE_MS = 60_000;
const SERVER_SNAPSHOT = 0;
const subscribers = new Set<() => void>();
let snapshot = SERVER_SNAPSHOT;
let timer: number | null = null;

function currentMinute(): number {
  return Math.floor(Date.now() / MINUTE_MS) * MINUTE_MS;
}

function notifySubscribers() {
  for (const subscriber of subscribers) subscriber();
}

function scheduleNextMinute() {
  if (subscribers.size === 0) return;

  const untilNextMinute = MINUTE_MS - (Date.now() % MINUTE_MS) + 25;
  timer = window.setTimeout(() => {
    timer = null;
    const nextSnapshot = currentMinute();
    if (nextSnapshot !== snapshot) {
      snapshot = nextSnapshot;
      notifySubscribers();
    }
    scheduleNextMinute();
  }, untilNextMinute);
}

function subscribe(onChange: () => void): () => void {
  subscribers.add(onChange);

  if (subscribers.size === 1) {
    snapshot = currentMinute();
    scheduleNextMinute();
  }

  // Reconcile the deterministic server snapshot with the browser clock.
  onChange();

  return () => {
    subscribers.delete(onChange);
    if (subscribers.size === 0 && timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };
}

/** A shared, minute-aligned clock with a deterministic SSR snapshot. */
export function useCurrentMinute(): number {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => SERVER_SNAPSHOT
  );
}
