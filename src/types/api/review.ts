export interface RelatedReviewVilla {
  id: string;
  name: string;
}

export interface RelatedReviewActivity {
  id: string;
  name: string;
}

export interface RelatedReviewBooking {
  id: string;
}

/**
 * Shape returned by GET /reviews (ReviewPaginationDto).
 *
 * Note: `villaId`, `activityId`, `bookingId` and `createdAt` are `@Exclude()`d
 * by the backend, so filtering reviews by villa must go through the
 * `filter.villaId` query param rather than post-filtering the payload.
 */
export interface Review {
  id: string;
  rating: number;
  message: string;
  booking?: RelatedReviewBooking;
  activity?: RelatedReviewActivity;
  villa?: RelatedReviewVilla;
}

export interface ReviewQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  [filter: string]: string | number | undefined;
}
