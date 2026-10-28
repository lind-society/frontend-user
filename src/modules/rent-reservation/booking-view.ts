import {
  countNights,
  findOutstandingPayment,
  findSettledPayment,
  formatBookingDate,
  toBookingReference,
  toBookingStage,
} from '@/lib/mappers/booking';
import { formatLocation, formatPrice } from '@/lib/mappers/format';

import { PublicBooking } from '@/types/api/booking';

/**
 * Feeds the existing reservation screens with a real booking.
 *
 * The rent-reservation components were built against hardcoded placeholders.
 * Rather than restyle them, every field they render is offered here as an
 * optional override: pass a view and they show the real booking, omit it and
 * they behave exactly as before. That keeps `/rent/[name]/reservation` — which
 * is still a design mock — pixel-identical.
 */
export interface ReservationBookingView {
  reference: string;
  propertyName: string;
  propertyAddress: string;
  photo: string | null;
  mapLink: string | null;
  guests: number;
  checkIn: string;
  checkOut: string;
  nights: number | null;
  nightlyLabel: string;
  nightlyAmount: string;
  totalAmount: string;
  /** Which of the three steps the booking currently sits at. */
  step: ReservationStepName;
  status: string;
  isActivity: boolean;
  /** Set once the gateway has confirmed the money. */
  paidChannel: string | null;
  paidAt: string | null;
  /** A payment already opened and awaiting the guest, if any. */
  outstandingPaymentId: string | null;
}

export type ReservationStepName =
  | 'additional-services'
  | 'payment-method'
  | 'payment-details';

/**
 * Maps booking status onto the three-step reservation UI:
 * waiting on the property -> pay -> done.
 */
export function toReservationStep(status: string | null): ReservationStepName {
  switch (toBookingStage(status as never)) {
    case 'awaiting-payment':
      return 'payment-method';
    case 'confirmed':
      return 'payment-details';
    default:
      return 'additional-services';
  }
}

export function toReservationBookingView(
  booking: PublicBooking
): ReservationBookingView {
  const nights = countNights(booking.checkInDate, booking.checkOutDate);
  const symbol = booking.currency?.symbol;
  const settled = findSettledPayment(booking.payments);
  const outstanding = findOutstandingPayment(booking.payments);

  // Only the total is authoritative; a per-night figure is derived for display
  // and deliberately omitted when there are no nights to divide by.
  const perNight = nights ? Number(booking.totalAmount) / nights : null;

  return {
    reference: toBookingReference(booking.id),
    propertyName: booking.property?.name ?? 'Your reservation',
    propertyAddress:
      formatLocation(
        booking.property?.address,
        booking.property?.city,
        booking.property?.state,
        booking.property?.country
      ) || '-',
    photo: booking.property?.photos?.[0] ?? null,
    mapLink: booking.property?.mapLink ?? null,
    guests: booking.totalGuest,
    checkIn: formatBookingDate(
      booking.type === 'activity' ? booking.bookingDate : booking.checkInDate
    ),
    checkOut: formatBookingDate(booking.checkOutDate),
    nights,
    nightlyLabel: nights
      ? `${formatPrice(perNight, symbol)} x ${nights} ${
          nights > 1 ? 'nights' : 'night'
        }`
      : 'Reservation',
    nightlyAmount: formatPrice(Number(booking.totalAmount), symbol),
    totalAmount: formatPrice(Number(booking.totalAmount), symbol),
    step: toReservationStep(booking.status),
    status: booking.status ?? '',
    isActivity: booking.type === 'activity',
    paidChannel: settled?.paymentChannel ?? settled?.paymentMethod ?? null,
    paidAt: settled?.paidAt ?? null,
    outstandingPaymentId: outstanding?.id ?? null,
  };
}
