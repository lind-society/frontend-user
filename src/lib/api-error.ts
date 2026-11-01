import axios from 'axios';

/**
 * A message fit to show a visitor for a failed API call.
 *
 * The backend answers validation failures with 422 and a per-field list
 * (`data: [{ field, message: [...] }]`); surfacing the first of those is far
 * more useful than the generic "unprocessable entity".
 */
export const getApiErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  if (!axios.isAxiosError(error)) return fallback;

  const body = error.response?.data as
    { message?: string; data?: unknown } | undefined;

  if (Array.isArray(body?.data)) {
    const first = (body.data as { message?: string[] }[])[0]?.message?.[0];
    if (first) return first;
  }

  if (error.response?.status === 429) {
    return 'Too many attempts. Please wait a minute and try again.';
  }

  return body?.message || fallback;
};

/** Pulls the access token out of the link the booking endpoints return. */
export const tokenFromBookingLink = (bookingLink: string): string | null => {
  try {
    const parts = new URL(bookingLink).pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] ?? null;
  } catch {
    return null;
  }
};
