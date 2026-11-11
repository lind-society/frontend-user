import { formatLocation, formatPrice } from './format';

import { Villa as ApiVilla } from '@/types/api/villa';

/**
 * View model consumed by `VillaCard`.
 *
 * `bathrooms` and `maxGuests` are optional because the backend has no such
 * columns — see `toVillaCard` below. Keep them optional so the card can hide
 * the chip rather than render a fabricated number.
 */
export interface VillaCardModel {
  id: string;
  name: string;
  location: string;
  price: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  maxGuests?: number;
  /** Absent for properties — the backend exposes no rating on that entity. */
  rating?: number;
  images: string[];
  /** Property cards only: "Leasehold" / "Freehold". */
  ownership?: string;
  isFavorite: boolean;
}

/**
 * Map a villa from GET /villas onto the card view model.
 *
 * Data notes:
 * - `bedrooms` is derived by counting `additionals` of type `bedrooms`; the
 *   backend models rooms as additionals rather than a numeric column.
 * - `bathrooms` and `maxGuests` have no backing column anywhere in the schema,
 *   so they stay undefined instead of being invented.
 * - price prefers the season-aware `currentPrice` the backend resolves for
 *   today, falling back to the discounted then the list daily price.
 */
export const toVillaCard = (villa: ApiVilla): VillaCardModel => {
  const symbol = villa.currentPrice?.currency?.symbol ?? villa.currency?.symbol;

  const amount =
    villa.currentPrice?.currentDailyPriceAfterDiscount ??
    villa.currentPrice?.currentDailyPrice ??
    villa.dailyPriceAfterDiscount ??
    villa.dailyPrice;

  const bedrooms = villa.additionals?.filter(
    (additional) => additional.type === 'bedrooms'
  ).length;

  return {
    id: villa.id,
    name: villa.name,
    location: formatLocation(villa.city, villa.country),
    price: formatPrice(amount, symbol),
    description: villa.highlight,
    bedrooms,
    rating: villa.averageRating,
    images: villa.photos ?? [],
    isFavorite: Boolean(villa.isFavorite),
  };
};

/** Number of rooms the backend models as `bedrooms` additionals. */
export const countBedrooms = (villa: ApiVilla): number =>
  villa.additionals?.filter((additional) => additional.type === 'bedrooms')
    .length ?? 0;

/**
 * The nightly rate a guest would pay today: the season-aware price the backend
 * resolves, then the discounted list price, then the plain list price.
 * Monetary columns arrive as strings in JSON, so everything is coerced.
 */
export const getNightlyRate = (villa: ApiVilla): number | null => {
  const raw =
    villa.currentPrice?.currentDailyPriceAfterDiscount ??
    villa.currentPrice?.currentDailyPrice ??
    villa.dailyPriceAfterDiscount ??
    villa.dailyPrice;

  const amount = Number(raw);

  return raw === null || raw === undefined || Number.isNaN(amount)
    ? null
    : amount;
};
