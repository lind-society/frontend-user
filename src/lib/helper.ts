export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

/**
 * A calendar date picked in the browser, as an ISO string at midnight UTC.
 *
 * `date.toISOString()` on a local-midnight date lands on the *previous* day for
 * anyone east of UTC (Bali is UTC+8), which would book the wrong night.
 */
export const toUtcDateIso = (date: Date): string =>
  new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  ).toISOString();

/** `yyyy-MM-dd` of the date as the visitor sees it. */
export const toLocalDateKey = (date: Date): string =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
