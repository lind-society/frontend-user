import { formatLocation, formatPrice } from './format';
import { VillaCardModel } from './villa';

import { Property as ApiProperty } from '@/types/api/property';

/**
 * Map a property from GET /properties onto the shared card view model.
 *
 * Properties reuse `VillaCard` (rendered with `rentType='sale'`), so the model
 * is the same. Like villas, the schema has no `bathrooms`/`maxGuests` columns;
 * `bedrooms` is derived from `additionals` of type `bedrooms`, which the list
 * endpoint embeds via `propertyAdditionals`.
 *
 * Price is a one-off sale price here — `priceAfterDiscount` when a discount is
 * configured, otherwise the list price.
 */
export const toPropertyCard = (property: ApiProperty): VillaCardModel => {
  const amount = property.priceAfterDiscount ?? property.price;

  const bedrooms = property.additionals?.filter(
    (additional) => additional.type === 'bedrooms'
  ).length;

  return {
    id: property.id,
    name: property.name,
    location: formatLocation(property.city, property.country),
    price: formatPrice(amount, property.currency?.symbol),
    description: property.highlight,
    bedrooms,
    images: property.photos ?? [],
    isFavorite: Boolean(property.isFavorite),
  };
};
