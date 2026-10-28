export type SearchEntityType = 'villa' | 'property' | 'activity';

/**
 * A single hit from GET /search — a public endpoint that UNIONs `villas`,
 * `properties` and `activities`.
 *
 * The projection is deliberately thin (no price, photos or rating), which makes
 * it a good fit for the search-bar autocomplete. Result pages that render full
 * cards should query the per-type list endpoints instead, e.g.
 * `/villas?search=<term>`.
 */
export interface SearchEntity {
  id: string;
  name: string;
  secondaryName: string;
  highlight: string;
  country: string;
  city: string;
  state: string;
  isFavorite: string;
  /** discriminator derived from the source table */
  type: SearchEntityType;
}

/** Query params accepted by GET /search, alongside `page` and `limit`. */
export interface SearchQuery {
  name?: string;
  highlight?: string;
  country?: string;
  city?: string;
  state?: string;
  isFavorite?: boolean;
  page?: number;
  limit?: number;
}
