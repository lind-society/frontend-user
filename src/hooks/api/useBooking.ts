import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';
import { shouldWatchBooking } from '@/lib/mappers/booking';

import { useGetApi } from './useApi';

import {
  BookingCreated,
  BookingPayment,
  CreateBookingPayload,
  PaymentChannel,
  PaymentRequest,
  PublicBooking,
} from '@/types/api/booking';
import { Data, Payload } from '@/types/api/payload';

/**
 * POST /villas/:id/book — public endpoint (`@Public()` on the route), so a
 * guest can book without an account.
 */
export const useBookVilla = (villaId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const { data } = await api.post<Payload<BookingCreated>>(
        `/villas/${villaId}/book`,
        { ...payload, type: 'villa', villaId }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['villa', villaId] });
    },
  });
};

/** POST /activities/:id/book — public endpoint, same guest-checkout model. */
export const useBookActivity = (activityId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateBookingPayload) => {
      const { data } = await api.post<Payload<BookingCreated>>(
        `/activities/${activityId}/book`,
        { ...payload, type: 'activity', activityId }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity', activityId] });
    },
  });
};

/** The guest's link token doubles as their credential on the payment routes. */
const bookingTokenHeader = (token: string) => ({
  headers: { 'x-booking-token': token },
});

export const publicBookingKey = (token?: string) => [
  'booking',
  'public',
  token,
];

const BOOKING_POLL_INTERVAL = 5000;

/**
 * GET /bookings/public/:accessToken — the only booking endpoint open to the
 * world. The token in the URL is the whole authorisation story, so the cache is
 * keyed on it and never shared between links.
 *
 * Polling is decided from the booking itself rather than by the caller, so the
 * page cannot end up watching a booking that will never move — see
 * `shouldWatchBooking`.
 */
export const usePublicBooking = (token?: string) =>
  useQuery<Payload<PublicBooking>, Error>({
    queryKey: publicBookingKey(token),
    queryFn: async () => {
      const { data } = await api.get<Payload<PublicBooking>>(
        `/bookings/public/${token}`
      );
      return data;
    },
    enabled: Boolean(token),
    // A booking changes underneath the guest (admin, owner, gateway), so a
    // cached copy is never worth showing.
    staleTime: 0,
    gcTime: 0,
    // A 404 or an expired link is an answer, not a hiccup worth retrying.
    retry: false,
    refetchInterval: (query) => {
      const booking = query.state.data?.data;

      return booking && shouldWatchBooking(booking)
        ? BOOKING_POLL_INTERVAL
        : false;
    },
  });

/** GET /payment-channels — public, so a guest can pick how to pay. */
export const usePaymentChannels = () =>
  useGetApi<Payload<Data<PaymentChannel[]>>>({
    key: ['payment-channels'],
    url: 'payment-channels',
    params: { limit: 100 },
    // Channels are configuration, not live data.
    staleTime: 30 * 60 * 1000,
  });

/**
 * POST /bookings/:bookingId/payments — opens a payment for the outstanding
 * amount. The server decides the amount; sending one is optional and only
 * accepted if it matches.
 */
export const useCreateBookingPayment = (bookingId?: string, token?: string) =>
  useMutation({
    mutationFn: async (payload: {
      paymentMethod?: string;
      paymentChannel?: string;
    }) => {
      const { data } = await api.post<Payload<BookingPayment>>(
        `/bookings/${bookingId}/payments`,
        payload,
        bookingTokenHeader(token ?? '')
      );
      return data.data;
    },
  });

/**
 * POST /bookings/:bookingId/payments/:id/pay/request — hands the payment to
 * the gateway and returns the instructions (VA number, QR string or redirect).
 *
 * Only `channelCode` is sent: the backend fills in the amount, the payer
 * details and the return URLs from the booking itself, so a tampered browser
 * cannot change what is charged.
 */
export const useCreatePaymentRequest = (bookingId?: string, token?: string) =>
  useMutation({
    mutationFn: async ({
      bookingPaymentId,
      channelCode,
    }: {
      bookingPaymentId: string;
      channelCode: string;
    }) => {
      const { data } = await api.post<Payload<PaymentRequest>>(
        `/bookings/${bookingId}/payments/${bookingPaymentId}/pay/request`,
        { channelCode },
        bookingTokenHeader(token ?? '')
      );
      return data.data;
    },
  });
