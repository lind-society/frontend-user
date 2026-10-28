'use client';

import { AxiosError } from 'axios';
import Link from 'next/link';
import React from 'react';

import { usePublicBooking } from '@/hooks/api/useBooking';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

import AdditionalService from './additional-service';
import { toReservationBookingView } from './booking-view';
import ContentRentReservation1 from './content-1';
import PaymentDetails from './payment-details';
import PaymentMethods from './payment-method';

/**
 * The guest-facing reservation flow, driven by a real booking.
 *
 * Deliberately built from the same components as `/rent/[name]/reservation` so
 * the customer sees the flow they were already designed to see. The only
 * difference is that the step is decided by the booking's status rather than by
 * a URL parameter — the link a guest receives never changes, it just shows a
 * different step as the booking moves along.
 */

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className='bg-bg py-[32px] md:py-[64px] flex flex-col gap-6'>
    {children}
  </div>
);

const LinkProblem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Shell>
    <BaseContainer>
      <div className='flex flex-col items-start gap-4 bg-cream-light py-8 md:py-12 px-5 md:px-10 lg:px-16 rounded shadow-sm'>
        <h2 className='text-xl md:text-2xl font-semibold text-primary'>
          {title}
        </h2>
        <p className='text-text'>{description}</p>
        <Button variant='primary' asChild>
          <Link href='/'>Back to Lind Society</Link>
        </Button>
      </div>
    </BaseContainer>
  </Shell>
);

const BookingReservation = ({ token }: { token: string }) => {
  const { data, error, isLoading } = usePublicBooking(token);
  const booking = data?.data ?? null;

  if (isLoading) {
    return (
      <Shell>
        <BaseContainer>
          <div className='h-64 animate-pulse rounded bg-cream-light shadow-sm' />
        </BaseContainer>
      </Shell>
    );
  }

  if (error) {
    const status = (error as AxiosError)?.response?.status;

    if (status === 403) {
      return (
        <LinkProblem
          title='This link is no longer active'
          description='The reservation behind this link has been closed, or the link has expired. Reply to our WhatsApp message and our team will help you with new dates.'
        />
      );
    }

    return (
      <LinkProblem
        title='We could not find this reservation'
        description='Please double-check the link from your WhatsApp message — it may have been cut short when it was copied.'
      />
    );
  }

  if (!booking) {
    return (
      <LinkProblem
        title='We could not find this reservation'
        description='Please double-check the link from your WhatsApp message.'
      />
    );
  }

  const view = toReservationBookingView(booking);

  return (
    <Shell>
      <ContentRentReservation1 currentStep={view.step} booking={view} />

      {view.step === 'additional-services' && (
        <AdditionalService onContinue={() => undefined} awaitingConfirmation />
      )}

      {view.step === 'payment-method' && (
        <PaymentMethods
          onContinue={() => undefined}
          booking={view}
          bookingId={booking.id}
          token={token}
        />
      )}

      {view.step === 'payment-details' && <PaymentDetails booking={view} />}
    </Shell>
  );
};

export default BookingReservation;
