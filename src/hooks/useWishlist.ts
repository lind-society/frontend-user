import { useCallback, useSyncExternalStore } from 'react';

export type WishlistKind = 'rent' | 'sale';

export interface WishlistItem {
  kind: WishlistKind;
  id: string;
}

const STORAGE_KEY = 'wishlist';

const listeners = new Set<() => void>();

/** Cached so useSyncExternalStore sees a stable reference until something changes. */
let cache: { raw: string | null; items: WishlistItem[] } | null = null;

const read = (): WishlistItem[] => {
  let raw: string | null;

  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked (private mode); the wishlist then lives for the session only.
    return cache?.items ?? [];
  }

  if (cache && cache.raw === raw) return cache.items;

  let items: WishlistItem[] = [];

  try {
    const parsed = raw ? JSON.parse(raw) : [];

    if (Array.isArray(parsed)) {
      items = parsed.filter(
        (item): item is WishlistItem =>
          item &&
          (item.kind === 'rent' || item.kind === 'sale') &&
          typeof item.id === 'string'
      );
    }
  } catch {
    items = [];
  }

  cache = { raw, items };

  return items;
};

const write = (items: WishlistItem[]) => {
  const raw = JSON.stringify(items);

  cache = { raw, items };

  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // Keep the in-memory copy; see read().
  }

  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };

  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

/** Saved villas and properties, kept in this browser (no account needed). */
export const useWishlist = () => {
  const items = useSyncExternalStore(subscribe, read, () => []);

  const has = useCallback(
    (kind: WishlistKind, id: string | number) =>
      items.some((item) => item.kind === kind && item.id === String(id)),
    [items]
  );

  const toggle = useCallback((kind: WishlistKind, id: string | number) => {
    const current = read();
    const exists = current.some(
      (item) => item.kind === kind && item.id === String(id)
    );

    write(
      exists
        ? current.filter(
            (item) => !(item.kind === kind && item.id === String(id))
          )
        : [...current, { kind, id: String(id) }]
    );
  }, []);

  return { items, has, toggle };
};
