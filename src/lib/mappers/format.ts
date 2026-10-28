/** Formatting helpers shared by the villa/property/activity card mappers. */

/**
 * Render a monetary amount with its currency symbol.
 * Returns `-` when the backend has no price for the record (nullable columns).
 */
export const formatPrice = (
  amount: number | null | undefined,
  symbol?: string
): string => {
  if (amount === null || amount === undefined) return '-';
  return `${symbol ?? ''}${new Intl.NumberFormat('id-ID').format(
    amount
  )}`.trim();
};

/** `city, country`, skipping blanks so we never render a dangling comma. */
export const formatLocation = (
  ...parts: (string | null | undefined)[]
): string => parts.filter(Boolean).join(', ');

/**
 * Slug used by the `[name]` detail routes.
 * Matches the slug `VillaCard` builds so links stay consistent.
 */
export const toSlug = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, '-');
