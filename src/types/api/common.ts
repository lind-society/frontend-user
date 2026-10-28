/** Shared value objects reused across villas, properties and activities. */

export interface Icon {
  key: string;
  url: string;
}

export interface PlaceNearby {
  name: string;
  distance: number;
}

export type DiscountType = 'percentage' | 'fixed';

export type FacilityType = 'main' | 'optional';

export type AdditionalType =
  | 'bedrooms'
  | 'indoor_areas'
  | 'outdoor_areas'
  | 'more_pictures';

export type VillaPriceRuleSeason =
  | 'regular_season'
  | 'low_season'
  | 'high_season'
  | 'peak_season';

// relations embedded in list/detail responses
export interface RelatedCurrency {
  id: string;
  name: string;
  code: string;
  symbol: string;
}

export interface RelatedOwner {
  id: string;
  name: string;
  type: string;
  companyName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  address: string;
  website: string | null;
  status: string;
}

export interface RelatedReview {
  id: string;
  rating: number;
  message: string;
}

export interface RelatedFacility {
  id: string;
  name: string;
  icon: Icon | null;
  type: FacilityType;
}

export interface RelatedFeature {
  id: string;
  name: string;
  type: string;
  icon: Icon;
  free: boolean;
  currencyId: string;
  price: number | null;
  discountType: DiscountType;
  discount: number | null;
  priceAfterDiscount: number | null;
}

export interface RelatedAdditional {
  id: string;
  name: string;
  type: AdditionalType;
}

export interface RelatedVillaPolicyType {
  id: string;
  name: string;
}

export interface RelatedVillaPolicy {
  id: string;
  name: string;
  icon: Icon | null;
  type: RelatedVillaPolicyType;
}

export interface RelatedVillaPriceRule {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  season: VillaPriceRuleSeason;
  isDiscount: boolean;
  discountType: DiscountType;
  discount: number;
  isActive: boolean;
  isAppliedToAllVilla?: boolean;
}
