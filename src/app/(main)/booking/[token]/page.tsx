import { Metadata } from 'next';
import React from 'react';

import BookingReservation from '@/modules/rent-reservation/booking-reservation';

/**
 * The single link a guest receives over WhatsApp: `/booking/<accessToken>`.
 *
 * The URL never changes as the booking moves from awaiting confirmation to
 * payment to confirmed — the page reads the current status and shows the
 * matching step of the reservation flow.
 *
 * The token is the guest's only credential, so the page is kept out of search
 * engines and out of any referrer header.
 */
export const metadata: Metadata = {
  title: 'Your reservation | Lind Society',
  description: 'Track and pay for your Lind Society reservation.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function BookingReservationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return <BookingReservation token={token} />;
}
