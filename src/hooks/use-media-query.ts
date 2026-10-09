"use client";

import { useCallback, useSyncExternalStore } from "react";

export interface MediaQuerySnapshot {
  matches: boolean;
  revision: number;
  resolved: boolean;
}

interface MediaQueryStore {
  query: string;
  snapshot: MediaQuerySnapshot;
  media: MediaQueryList | null;
  mediaListener: (() => void) | null;
  subscribers: Set<() => void>;
}

const serverSnapshot: MediaQuerySnapshot = Object.freeze({
  matches: false,
  revision: 0,
  resolved: false,
});
const mediaQueryStores = new Map<string, MediaQueryStore>();

function getMediaQueryStore(query: string): MediaQueryStore {
  const existing = mediaQueryStores.get(query);
  if (existing) return existing;

  const store: MediaQueryStore = {
    query,
    snapshot: serverSnapshot,
    media: null,
    mediaListener: null,
    subscribers: new Set(),
  };
  mediaQueryStores.set(query, store);
  return store;
}

function subscribeToMediaQuery(
  store: MediaQueryStore,
  onChange: () => void
): () => void {
  store.subscribers.add(onChange);

  if (!store.media) {
    const media = window.matchMedia(store.query);
    const preferenceChanged = store.snapshot.matches !== media.matches;
    const firstResolution = !store.snapshot.resolved;
    store.media = media;
    store.snapshot = {
      matches: media.matches,
      revision: store.snapshot.revision + Number(preferenceChanged),
      resolved: true,
    };
    store.mediaListener = () => {
      store.snapshot = {
        matches: media.matches,
        revision: store.snapshot.revision + 1,
        resolved: true,
      };
      for (const subscriber of store.subscribers) subscriber();
    };
    media.addEventListener("change", store.mediaListener);

    // Reconcile the stable SSR snapshot with the browser preference after hydration.
    if (preferenceChanged || firstResolution) onChange();
  }

  return () => {
    store.subscribers.delete(onChange);
    if (store.subscribers.size === 0 && store.media && store.mediaListener) {
      store.media.removeEventListener("change", store.mediaListener);
      store.media = null;
      store.mediaListener = null;
    }
  };
}

/**
 * Track a media query without reading browser state during render.
 * The stable server snapshot keeps SSR and the first client render aligned.
 */
export function useMediaQuerySnapshot(query: string): MediaQuerySnapshot {
  const store = getMediaQueryStore(query);
  const subscribe = useCallback(
    (onChange: () => void) => subscribeToMediaQuery(store, onChange),
    [store]
  );
  const getSnapshot = useCallback(() => store.snapshot, [store]);
  const getServerSnapshot = useCallback(() => serverSnapshot, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useMediaQuery(query: string): boolean {
  return useMediaQuerySnapshot(query).matches;
}
