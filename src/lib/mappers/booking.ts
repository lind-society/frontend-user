import { formatLocation, formatPrice } from './format';

import {
  BookingStatus,
  PublicBooking,
  PublicBookingPayment,
} from '@/types/api/booking';

/**
 * Turns the raw booking payload into everything the book-inform page renders.
 *
 * The status vocabulary differs per booking type (a villa goes
 * `requested → waiting_for_payment → booked`, an activity
 * `pending → confirmed`), so all the branching on it lives here rather than
 * being spread across the components.
 */

export type BookingStage =
  | 'awaiting-owner'
  | 'searching-alternative'
  | 'awaiting-payment'
  | 'confirmed'
  | 'closed'
  | 'unknown';

export interface BookingStageCopy {
  stage: BookingStage;
  /** Short label for the badge. */
  label: string;
  /** One line explaining what is happening. */
  headline: string;
  description: string;
  tone: 'neutral' | 'progress' | 'action' | 'success';
}

const STAGE_COPY: Record<BookingStage, Omit<BookingStageCopy, 'stage'>> = {
  'awaiting-owner': {
    label: 'Reservation received',
    headline: 'We are confirming availability',
    description:
      'Our team is checking your dates with the property. You will get a WhatsApp message here as soon as it is confirmed — usually within a few hours.',
    tone: 'progress',
  },
  'searching-alternative': {
    label: 'Looking for alternatives',
    headline: 'These dates are no longer available',
    description:
      'The property is taken for your dates. Our team is already looking for something similar and will message you on WhatsApp shortly.',
    tone: 'neutral',
  },
  'awaiting-payment': {
    label: 'Ready for payment',
    headline: 'Your dates are available',
    description:
      'Complete the payment below to secure your reservation. Your dates are held while the payment is outstanding.',
    tone: 'action',
  },
  confirmed: {
    label: 'Confirmed',
    headline: 'Your booking is confirmed',
    description:
      'We have received your payment. Check-in details have been sent to your email and WhatsApp.',
    tone: 'success',
  },
  closed: {
    label: 'Closed',
    headline: 'This reservation has been closed',
    description:
      'If you would like to look for other dates or another property, reply to our WhatsApp message and our team will help you.',
    tone: 'neutral',
  },
  unknown: {
    label: 'Reservation',
    headline: 'Your reservation',
    description: 'Here are the details we have on file for this reservation.',
    tone: 'neutral',
  },
};

export const toBookingStage = (status: BookingStatus | null): BookingStage => {
  switch (status) {
    case 'requested':
      return 'awaiting-owner';
    case 'negotiation':
      return 'searching-alternative';
    // For an activity `pending` *is* the payable state — there is no separate
    // "waiting for payment" step the way villas have.
    case 'waiting_for_payment':
    case 'pending':
      return 'awaiting-payment';
    case 'booked':
    case 'checked_in':
    case 'done':
    case 'confirmed':
    case 'completed':
      return 'confirmed';
    case 'canceled':
      return 'closed';
    default:
      return 'unknown';
  }
};

export const describeBookingStage = (
  status: BookingStatus | null
): BookingStageCopy => {
  const stage = toBookingStage(status);

  return { stage, ...STAGE_COPY[stage] };
};

/** A payment already opened and still awaiting the guest, if there is one. */
export const findOutstandingPayment = (
  payments: PublicBookingPayment[]
): PublicBookingPayment | null =>
  payments.find(
    (payment) =>
      payment.status === 'pending' ||
      payment.status === 'requires_action' ||
      payment.status === 'active'
  ) ?? null;

export const findSettledPayment = (
  payments: PublicBookingPayment[]
): PublicBookingPayment | null =>
  payments.find(
    (payment) => payment.status === 'paid' || payment.status === 'authorized'
  ) ?? null;

/**
 * Whether the page should keep re-reading this booking.
 *
 * Exactly two things move without the guest touching anything: the owner
 * confirming availability over WhatsApp, and the payment gateway's webhook
 * landing on the backend. Neither produces a signal in the browser, and
 * everything else is either finished or waiting on a human, so polling it would
 * just be noise.
 */
export const shouldWatchBooking = (booking: PublicBooking): boolean => {
  const stage = toBookingStage(booking.status);

  if (stage === 'awaiting-owner') {
    return true;
  }

  return (
    stage === 'awaiting-payment' &&
    Boolean(findOutstandingPayment(booking.payments))
  );
};

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatBookingDate = (value: string | null): string =>
  value ? dateFormatter.format(new Date(value)) : '-';

/** Whole nights between check-in and check-out; `null` for activities. */
export const countNights = (
  checkInDate: string | null,
  checkOutDate: string | null
): number | null => {
  if (!checkInDate || !checkOutDate) return null;

  const nights = Math.ceil(
    (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return nights > 0 ? nights : null;
};

export interface BookingSummaryView {
  reference: string;
  propertyName: string;
  propertyLocation: string;
  mapLink: string | null;
  photo: string | null;
  schedule: { label: string; value: string }[];
  guests: number;
  amount: string;
}

/** The short code the owner and the admin quote when talking about a booking. */
export const toBookingReference = (bookingId: string): string =>
  bookingId.replace(/-/g, '').slice(0, 8).toUpperCase();

export const toBookingSummary = (
  booking: PublicBooking
): BookingSummaryView => {
  const nights = countNights(booking.checkInDate, booking.checkOutDate);

  const schedule =
    booking.type === 'activity'
      ? [{ label: 'Date', value: formatBookingDate(booking.bookingDate) }]
      : [
          { label: 'Check-in', value: formatBookingDate(booking.checkInDate) },
          {
            label: 'Check-out',
            value: formatBookingDate(booking.checkOutDate),
          },
          ...(nights ? [{ label: 'Nights', value: `${nights}` }] : []),
        ];

  return {
    reference: toBookingReference(booking.id),
    propertyName: booking.property?.name ?? 'Your reservation',
    propertyLocation: formatLocation(
      booking.property?.city,
      booking.property?.state,
      booking.property?.country
    ),
    mapLink: booking.property?.mapLink ?? null,
    photo: booking.property?.photos?.[0] ?? null,
    schedule,
    guests: booking.totalGuest,
    amount: formatPrice(booking.totalAmount, booking.currency?.symbol),
  };
};
