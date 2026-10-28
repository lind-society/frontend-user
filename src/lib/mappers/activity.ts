import { TouristActivity } from '@/modules/tourist-activity/constant';

import { formatLocation } from './format';

import { Activity as ApiActivity } from '@/types/api/activity';

/**
 * Map an activity from GET /activities onto the view model the tourist-activity
 * page already filters and sorts over.
 *
 * Field-by-field notes, because the backend does not cover the whole UI model:
 * - `duration` on the API is an enum (`temporary` | `permanent`) describing
 *   whether the activity runs on fixed dates, NOT a human "2 hours" string.
 *   It is passed through as-is rather than invented.
 * - `popularity` drives the "recommended" sort. The schema has no popularity
 *   score, so `totalReview` stands in as the closest real signal.
 * - `featured` maps to `isFavorite`, the only curation flag the entity carries.
 * - `tags` and `groupSize` have no backing column at all and stay empty.
 */
export const toTouristActivity = (activity: ApiActivity): TouristActivity => ({
  id: activity.id,
  name: activity.name,
  location: formatLocation(activity.city, activity.country),
  description: activity.highlight,
  price: activity.priceAfterDiscount ?? activity.price,
  originalPrice: activity.price,
  currency: activity.currency?.symbol ?? activity.currency?.code ?? '',
  currencyId: activity.currency?.id,
  // Admin-configurable (Activities Management); older rows without one set
  // fall back to "session", matching what the API always used to imply.
  priceUnit: activity.priceUnit || 'session',
  rating: activity.averageRating,
  reviews: activity.totalReview,
  category: activity.category?.name ?? '',
  tags: [],
  images: activity.photos ?? [],
  duration: activity.duration,
  groupSize: '',
  popularity: activity.totalReview,
  featured: Boolean(activity.isFavorite),
  openingHour: activity.openingHour,
  closingHour: activity.closingHour,
  mapLink: activity.mapLink,
  dailyLimit: activity.dailyLimit,
  bookedToday: activity.totalTodayBooking ?? activity.todayBooking ?? 0,
});
