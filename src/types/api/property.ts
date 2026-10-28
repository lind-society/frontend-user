import {
  DiscountType,
  PlaceNearby,
  RelatedAdditional,
  RelatedCurrency,
  RelatedFacility,
  RelatedFeature,
  RelatedOwner,
} from './common';

export type PropertyOwnershipType = 'leasehold' | 'freehold';

/**
 * Shape returned by GET /properties and GET /properties/:id
 * (PropertyPaginationDto, property.dto.ts:257).
 *
 * Note: `currencyId` and `ownerId` are `@Exclude()`d by the backend, so they
 * are absent from the payload — read the ids from the embedded relations.
 */
export interface Property {
  id: string;
  name: string;
  secondaryName: string;

  // pricing
  price: number;
  discountType: DiscountType | null;
  discount: number | null;
  priceAfterDiscount: number | null;

  ownershipType: PropertyOwnershipType;
  highlight: string;

  // location
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  mapLink: string;
  placeNearby: PlaceNearby[] | null;

  // media
  photos: string[];
  videos: string[] | null;
  video360s: string[] | null;
  floorPlans: string[] | null;

  soldStatus: boolean;
  isFavorite: boolean | null;

  // relations — present only when the endpoint embeds them
  currency?: RelatedCurrency;
  owner?: RelatedOwner;
  facilities?: RelatedFacility[];
  features?: RelatedFeature[];
  additionals?: RelatedAdditional[];
}

/** Query params for GET /properties (nestjs-paginate). */
export interface PropertyQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  [filter: string]: string | number | undefined;
}
