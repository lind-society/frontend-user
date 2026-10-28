import { useGetApi } from './useApi';

import { Data, Payload } from '@/types/api/payload';
import { Review, ReviewQuery } from '@/types/api/review';

/** GET /reviews — paginated list. Public endpoint. */
export const useReviews = (query: ReviewQuery = {}) =>
  useGetApi<Payload<Data<Review[]>>>({
    key: ['reviews', query],
    url: 'reviews',
    params: query,
  });

/**
 * Reviews for one villa.
 *
 * `villaId` is `@Exclude()`d from the response but IS filterable server-side
 * (verified in review.service.ts filterableColumns), so filter rather than
 * fetch-then-filter.
 */
export const useVillaReviews = (villaId?: string, limit = 10) =>
  useGetApi<Payload<Data<Review[]>>>({
    key: ['reviews', 'villa', villaId, limit],
    url: 'reviews',
    params: { page: 1, limit, 'filter.villaId': `$eq:${villaId}` },
    enabled: Boolean(villaId),
  });

/** Reviews for one activity — same filtering caveat as `useVillaReviews`. */
export const useActivityReviews = (activityId?: string, limit = 10) =>
  useGetApi<Payload<Data<Review[]>>>({
    key: ['reviews', 'activity', activityId, limit],
    url: 'reviews',
    params: { page: 1, limit, 'filter.activityId': `$eq:${activityId}` },
    enabled: Boolean(activityId),
  });
