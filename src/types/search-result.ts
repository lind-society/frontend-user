/**
 * Single canonical view model for search hits.
 *
 * Previously this interface was copy-pasted into four files (search-bar,
 * search-results, search-result-item and the search page). It now lives here so
 * the optionality below stays consistent everywhere.
 *
 * The public `GET /search` endpoint returns a thin projection — id, name,
 * location parts, and a type discriminator — with no price, photo or rating.
 * Those fields are therefore optional and every consumer must degrade
 * gracefully rather than render fabricated values.
 */
export type SearchResultType = 'rent' | 'buy' | 'tourist-activity';

export interface SearchResult {
  /** uuid for API-backed hits, number for the legacy static fixtures */
  id: string | number;
  title: string;
  location: string;
  type: SearchResultType;

  // not provided by GET /search
  price?: string;
  period?: string;
  rating?: number;
  reviews?: number;
  image?: string;

  // only ever present on the static fixtures
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  size?: string;
  duration?: string;
  groupSize?: string;
}
