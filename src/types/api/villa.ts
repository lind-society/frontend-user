import {
  DiscountType,
  PlaceNearby,
  RelatedAdditional,
  RelatedCurrency,
  RelatedFacility,
  RelatedFeature,
  RelatedOwner,
  RelatedReview,
  RelatedVillaPolicy,
  RelatedVillaPriceRule,
  VillaPriceRuleSeason,
} from './common';

export interface VillaAvailability {
  daily: boolean;
  monthly: boolean;
  yearly: boolean;
}

/** Season-aware price resolved by the backend for "today". */
export interface CurrentVillaPrices {
  currentSeason: VillaPriceRuleSeason;
  currentIsDiscount: boolean;
  currentDiscountType?: DiscountType;
  currentDiscount?: number;
  currentDailyPrice?: number;
  currentDailyPriceAfterDiscount?: number;
  currencyId: string;
  currency?: RelatedCurrency;
}

/**
 * Shape returned by GET /villas and GET /villas/:id (VillaPaginationDto).
 *
 * Monetary fields arrive as numbers via the backend's `@ToDecimal`, and
 * check-in/out arrive as `HH:mm` strings via `@ToHour`.
 */
export interface Villa {
  id: string;
  name: string;
  secondaryName: string;
  availability: VillaAvailability;

  // nightly pricing
  dailyPrice: number | null;
  lowSeasonDailyPrice: number | null;
  highSeasonDailyPrice: number | null;
  peakSeasonDailyPrice: number | null;
  dailyPriceAfterDiscount: number | null;
  lowSeasonDailyPriceAfterDiscount: number | null;
  highSeasonDailyPriceAfterDiscount: number | null;
  peakSeasonDailyPriceAfterDiscount: number | null;

  // long-stay pricing
  priceMonthly: number | null;
  priceYearly: number | null;
  discountMonthlyType: DiscountType | null;
  discountYearlyType: DiscountType | null;
  discountMonthly: number | null;
  discountYearly: number | null;
  priceMonthlyAfterDiscount: number | null;
  priceYearlyAfterDiscount: number | null;
  availabilityQuotaPerMonth: number | null;
  availabilityQuotaPerYear: number | null;

  // location
  highlight: string;
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  mapLink: string;
  placeNearby: PlaceNearby[] | null;

  /** `HH:mm` */
  checkInHour: string;
  /** `HH:mm` */
  checkOutHour: string;

  // media
  photos: string[];
  videos: string[] | null;
  video360s: string[] | null;
  floorPlans: string[] | null;

  averageRating: number;
  totalReview: number;
  isFavorite: boolean | null;

  currencyId: string | null;
  ownerId: string | null;

  // relations — present only when the endpoint embeds them
  currentPrice?: CurrentVillaPrices | null;
  currency?: RelatedCurrency;
  owner?: RelatedOwner;
  reviews?: RelatedReview[];
  additionals?: RelatedAdditional[];
  facilities?: RelatedFacility[];
  features?: RelatedFeature[];
  policies?: RelatedVillaPolicy[];
  priceRules?: RelatedVillaPriceRule[];
}

/** Query params for GET /villas (nestjs-paginate). */
export interface VillaQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  [filter: string]: string | number | undefined;
}
