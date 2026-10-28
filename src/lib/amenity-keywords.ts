/**
 * Maps the amenity chip ids used across the homepage/rent/buy search UI to a
 * keyword substring likely to appear in a facility's stored name, so they can
 * be sent as `$ilike` filters to GET /villas and GET /properties.
 *
 * The chip ids themselves (`air-cond`, `bbq`, ...) are UI shorthand, not real
 * facility names, so a direct match would never hit — this is the translation
 * layer between the two.
 */
export const AMENITY_FACILITY_KEYWORDS: Record<string, string> = {
  'air-cond': 'air condition',
  pool: 'pool',
  kitchen: 'kitchen',
  parking: 'parking',
  beach: 'beach',
  wifi: 'wifi',
  pets: 'pet',
  security: 'security',
  mountain: 'mountain',
  massage: 'massage',
  bbq: 'grill',
  yoga: 'yoga',
  seaview: 'sea view',
};
