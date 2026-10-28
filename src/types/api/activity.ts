import {
  DiscountType,
  PlaceNearby,
  RelatedCurrency,
  RelatedOwner,
} from './common';

export type ActivityDuration = 'temporary' | 'permanent';

export interface RelatedActivityCategory {
  id: string;
  name: string;
}

/**
 * Shape returned by GET /activities and GET /activities/:id
 * (ActivityPaginationDto, activity.dto.ts:236).
 *
 * Money arrives as numbers via `@ToDecimal`; opening/closing hours arrive as
 * `HH:mm` strings via `@ToHour`.
 */
export interface Activity {
  id: string;
  name: string;
  secondaryName: string;
  highlight: string;

  // pricing
  discountType: DiscountType | null;
  discount: number | null;
  price: number;
  priceAfterDiscount: number | null;
  /** e.g. "session", "person", "hour". Null on older rows. */
  priceUnit: string | null;

  duration: ActivityDuration;

  // location
  address: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  mapLink: string;
  placeNearby: PlaceNearby[] | null;

  /** `HH:mm` */
  openingHour: string;
  /** `HH:mm` */
  closingHour: string;

  /** ISO strings; only set when `duration` is `temporary` */
  startDate: string | null;
  endDate: string | null;

  dailyLimit: number;
  todayBooking?: number;
  totalTodayBooking: number | null;

  // media
  photos: string[];
  videos: string[] | null;
  video360s: string[] | null;
  floorPlans: string[] | null;

  averageRating: number;
  totalReview: number;
  isFavorite: boolean | null;

  // relations — present only when the endpoint embeds them
  category?: RelatedActivityCategory;
  currency?: RelatedCurrency;
  owner?: RelatedOwner;
}

/** Query params for GET /activities (nestjs-paginate). */
export interface ActivityQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  [filter: string]: string | number | undefined;
}
