export type BookingType = 'villa' | 'activity';

/** Guest details captured at checkout — CreateBookingCustomerDto. */
export interface CreateBookingCustomer {
  name: string;
  email: string;
  phoneCountryCode: string;
  /** digits only; the backend validates with @IsNumberString */
  phoneNumber: string;
}

/**
 * Payload for POST /villas/:id/book and POST /activities/:id/book
 * (CreateBookingDto).
 *
 * Conditional fields: `checkInDate`/`checkOutDate`/`villaId` are required when
 * `type` is `villa`; `bookingDate`/`activityId` when `type` is `activity`.
 * Dates are sent as ISO strings and parsed by `@Type(() => Date)`.
 */
export interface CreateBookingPayload {
  type: BookingType;
  totalGuest: number;
  totalAmount: number;
  currencyId: string;
  customer: CreateBookingCustomer;

  // villa bookings
  checkInDate?: string;
  checkOutDate?: string;
  villaId?: string;

  // activity bookings
  bookingDate?: string;
  activityId?: string;

  /** Optional — the backend defaults it per booking type. */
  status?: string;
  customerId?: string;
}

export interface BookingCreated {
  id: string;
  /**
   * The guest's tokenised link, e.g. `https://…/booking/<accessToken>`.
   * Only present on the create response — the token is never serialised again.
   */
  bookingLink?: string;
  status?: BookingStatus;
}

/**
 * Villa bookings and activity bookings use different status vocabularies; the
 * backend stores both in one column.
 */
export type VillaBookingStatus =
  | 'requested'
  | 'negotiation'
  | 'waiting_for_payment'
  | 'booked'
  | 'checked_in'
  | 'done'
  | 'canceled';

export type ActivityBookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'canceled';

export type BookingStatus = VillaBookingStatus | ActivityBookingStatus;

export type BookingPaymentStatus =
  | 'requires_action'
  | 'active'
  | 'pending'
  | 'paid'
  | 'expired'
  | 'authorized'
  | 'waiting_for_refund'
  | 'refunded'
  | 'cancelled'
  | 'failed';

/** The property behind a booking, trimmed to what the guest page renders. */
export interface PublicBookingProperty {
  id: string;
  name: string;
  secondaryName: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  mapLink: string | null;
  photos: string[];
}

export interface PublicBookingPayment {
  id: string;
  amount: number;
  status: BookingPaymentStatus;
  paymentMethod: string | null;
  paymentChannel: string | null;
  paidAt: string | null;
}

/** GET /bookings/public/:accessToken — BookingPublicDto. */
export interface PublicBooking {
  id: string;
  type: BookingType;
  status: BookingStatus | null;
  totalGuest: number;
  totalAmount: number;
  bookingDate: string | null;
  checkInDate: string | null;
  checkOutDate: string | null;
  accessExpiresAt: string | null;
  currency: { id: string; code: string; symbol: string } | null;
  customer: {
    name: string;
    email: string;
    phoneCountryCode: string;
    phoneNumber: string;
  } | null;
  property: PublicBookingProperty | null;
  payments: PublicBookingPayment[];
}

export type PaymentChannelType =
  | 'card'
  | 'debit_card'
  | 'credit_card'
  | 'e_wallet'
  | 'qr_code'
  | 'qris'
  | 'direct_debit'
  | 'virtual_account'
  | 'over_the_counter';

/** GET /payment-channels — public endpoint. */
export interface PaymentChannel {
  id: string;
  name: string;
  code: string;
  type: PaymentChannelType | null;
  description: string | null;
}

/** POST /bookings/:bookingId/payments — the record the gateway pays against. */
export interface BookingPayment {
  id: string;
  amount: number;
  status: BookingPaymentStatus;
  paymentMethod: string | null;
  paymentChannel: string | null;
}

/**
 * One instruction from the gateway: a redirect URL for e-wallets and cards, or
 * a QR string for QRIS. Virtual accounts return no action — the number arrives
 * in `channelProperties.virtualAccountNumber` instead.
 */
export interface PaymentAction {
  type?: string;
  value?: string;
  descriptor?: string;
}

/** POST /bookings/:bookingId/payments/:id/pay/request — PaymentRequestDto. */
export interface PaymentRequest {
  referenceId?: string;
  paymentRequestId?: string;
  channelCode?: string;
  requestAmount?: number;
  status?: string;
  failureCode?: string;
  actions?: PaymentAction[];
  channelProperties?: {
    virtualAccountNumber?: string;
    expiresAt?: string;
    paymentCode?: string;
    [key: string]: unknown;
  };
}
