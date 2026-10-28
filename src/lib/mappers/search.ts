import { formatLocation, formatPrice } from './format';

import { Activity as ApiActivity } from '@/types/api/activity';
import { Property as ApiProperty } from '@/types/api/property';
import { SearchEntity, SearchEntityType } from '@/types/api/search';
import { Villa as ApiVilla } from '@/types/api/villa';
import { SearchResult, SearchResultType } from '@/types/search-result';

/**
 * The API discriminates by source table; the UI routes by section.
 * `villa` → /rent, `property` → /buy, `activity` → /tourist-activity.
 */
const TYPE_MAP: Record<SearchEntityType, SearchResultType> = {
  villa: 'rent',
  property: 'buy',
  activity: 'tourist-activity',
};

/**
 * Map a hit from GET /search onto the shared search view model.
 *
 * Price, rating and image are intentionally left undefined — the endpoint is a
 * UNION projection over three tables and carries none of them. Consumers hide
 * those elements instead of showing placeholders.
 */
export const toSearchResult = (entity: SearchEntity): SearchResult => ({
  id: entity.id,
  title: entity.name,
  location: formatLocation(entity.city, entity.state, entity.country),
  type: TYPE_MAP[entity.type] ?? 'rent',
});

/**
 * Full-detail variants used by the search *results page*, which renders price
 * and photos. They come from the per-type list endpoints (`/villas?search=`,
 * …), all of which expose `name`, `secondaryName`, `address` and `country` as
 * searchable columns — verified in each service's `searchableColumns`.
 */
export const villaToSearchResult = (villa: ApiVilla): SearchResult => {
  const symbol = villa.currentPrice?.currency?.symbol ?? villa.currency?.symbol;
  const amount =
    villa.currentPrice?.currentDailyPriceAfterDiscount ??
    villa.currentPrice?.currentDailyPrice ??
    villa.dailyPriceAfterDiscount ??
    villa.dailyPrice;

  return {
    id: villa.id,
    title: villa.name,
    location: formatLocation(villa.city, villa.state, villa.country),
    type: 'rent',
    price: formatPrice(amount, symbol),
    period: 'per night',
    rating: villa.averageRating,
    reviews: villa.totalReview,
    image: villa.photos?.[0],
    bedrooms: villa.additionals?.filter((a) => a.type === 'bedrooms').length,
  };
};

export const propertyToSearchResult = (
  property: ApiProperty
): SearchResult => ({
  id: property.id,
  title: property.name,
  location: formatLocation(property.city, property.state, property.country),
  type: 'buy',
  price: formatPrice(
    property.priceAfterDiscount ?? property.price,
    property.currency?.symbol
  ),
  period: 'total',
  image: property.photos?.[0],
  bedrooms: property.additionals?.filter((a) => a.type === 'bedrooms').length,
});

export const activityToSearchResult = (
  activity: ApiActivity
): SearchResult => ({
  id: activity.id,
  title: activity.name,
  location: formatLocation(activity.city, activity.state, activity.country),
  type: 'tourist-activity',
  price: formatPrice(
    activity.priceAfterDiscount ?? activity.price,
    activity.currency?.symbol
  ),
  rating: activity.averageRating,
  reviews: activity.totalReview,
  image: activity.photos?.[0],
});
