import { AxiosError } from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';
import { MdEmail, MdSecurity } from 'react-icons/md';

import {
  useCreateBookingPayment,
  useCreatePaymentRequest,
} from '@/hooks/api/useBooking';

import BaseContainer from '@/components/layouts/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ReservationBookingView } from './booking-view';

import { PaymentRequest } from '@/types/api/booking';

/**
 * The on-screen buttons map onto the gateway's channel codes. Card brands all
 * route through the one card channel — the gateway decides the network from the
 * card number, not from which logo the guest clicked.
 */
const CHANNEL_CODES: Record<string, string> = {
  bri: 'BRI',
  bni: 'BNI',
  bca: 'BCA',
  mandiri: 'MANDIRI',
  visa: 'CARDS',
  mastercard: 'CARDS',
  jcb: 'CARDS',
  amex: 'CARDS',
};

function readErrorMessage(error: unknown): string {
  const message = (error as AxiosError<{ message?: string | string[] }>)
    ?.response?.data?.message;

  if (Array.isArray(message)) return message.join(', ');
  if (typeof message === 'string') return message;

  return 'Something went wrong while starting the payment. Please try again.';
}

interface PaymentMethodsProps {
  onContinue: () => void;
  /**
   * A real booking. Without it this screen stays the click-through mock that
   * `/rent/[name]/reservation` has always been.
   */
  booking?: ReservationBookingView;
  bookingId?: string;
  token?: string;
}

const PaymentMethods = ({
  onContinue,
  booking,
  bookingId,
  token,
}: PaymentMethodsProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [request, setRequest] = useState<PaymentRequest | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const createPayment = useCreateBookingPayment(bookingId, token);
  const createRequest = useCreatePaymentRequest(bookingId, token);

  const handleSelectPayment = (method: string) => {
    setSelectedPaymentMethod(method);
    setError(null);
  };

  const redirectUrl =
    request?.actions?.find((action) => action.value?.startsWith('http'))
      ?.value ?? null;
  const qrString =
    request?.actions?.find(
      (action) => action.value && !action.value.startsWith('http')
    )?.value ?? null;
  const virtualAccount = request?.channelProperties?.virtualAccountNumber;

  const handleContinue = async () => {
    // No booking behind this screen means the original mock flow.
    if (!booking || !bookingId || !token) {
      onContinue();
      return;
    }

    const channelCode = CHANNEL_CODES[selectedPaymentMethod];

    if (!channelCode) return;

    setError(null);
    setSubmitting(true);

    try {
      // The backend refuses a second payment while one is still pending, so an
      // already-open payment is continued rather than replaced.
      const bookingPaymentId =
        booking.outstandingPaymentId ??
        (
          await createPayment.mutateAsync({
            paymentChannel: channelCode,
          })
        ).id;

      const result = await createRequest.mutateAsync({
        bookingPaymentId,
        channelCode,
      });

      setRequest(result);

      const redirect = result.actions?.find((action) =>
        action.value?.startsWith('http')
      )?.value;

      if (redirect) {
        window.location.href = redirect;
      }
    } catch (caught) {
      setError(readErrorMessage(caught));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BaseContainer>
      <div className='flex flex-col lg:flex-row justify-between bg-cream-light py-8 md:py-12 px-5 md:px-10 lg:px-16 rounded shadow-sm gap-6'>
        {/* Left Column - Payment Methods */}
        <div className='py-4 flex-1 flex flex-col gap-5'>
          <h3 className='text-xl md:text-2xl font-semibold text-primary'>
            Payment Methods
          </h3>
          <p className='text-text text-base md:text-lg'>
            Choose your preferred payment method to secure your booking. All
            payment options are secure and encrypted.
          </p>

          <div className='flex flex-col gap-4'>
            <span className='font-semibold text-primary'>Bank transfer</span>
            <div className='flex gap-4 items-center flex-wrap'>
              <Button
                variant={
                  selectedPaymentMethod === 'bri'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'bri'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('bri')}
              >
                <Image src='/images/bri.svg' alt='BRI' width={32} height={22} />
                <span className='font-semibold text-sm'>BRI</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'bni'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'bni'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('bni')}
              >
                <Image src='/images/bni.svg' alt='BNI' width={32} height={22} />
                <span className='font-semibold text-sm'>BNI</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'bca'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'bca'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('bca')}
              >
                <Image src='/images/bca.svg' alt='BCA' width={32} height={22} />
                <span className='font-semibold text-sm'>BCA</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'mandiri'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'mandiri'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('mandiri')}
              >
                <Image
                  src='/images/mandiri.svg'
                  alt='MANDIRI'
                  width={32}
                  height={22}
                />
                <span className='font-semibold text-sm'>MANDIRI</span>
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <span className='font-semibold text-primary'>Card payments</span>
            <div className='flex gap-4 items-center flex-wrap'>
              <Button
                variant={
                  selectedPaymentMethod === 'visa'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'visa'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('visa')}
              >
                <Image
                  src='/images/visa.png'
                  alt='VISA'
                  width={51}
                  height={16}
                />
                <span className='font-semibold text-sm'>VISA</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'mastercard'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'mastercard'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('mastercard')}
              >
                <Image
                  src='/images/master-card.png'
                  alt='MASTER-CARD'
                  width={32}
                  height={22}
                />
                <span className='font-semibold text-sm'>MASTER CARD</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'jcb'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'jcb'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('jcb')}
              >
                <Image src='/images/jcb.png' alt='JCB' width={32} height={22} />
                <span className='font-semibold text-sm'>JCB</span>
              </Button>
              <Button
                variant={
                  selectedPaymentMethod === 'amex'
                    ? 'primary'
                    : 'primary-outline'
                }
                className={`flex items-center gap-2 ${
                  selectedPaymentMethod === 'amex'
                    ? 'text-cream'
                    : 'text-primary'
                }`}
                onClick={() => handleSelectPayment('amex')}
              >
                <Image
                  src='/images/american-express.png'
                  alt='AMERICAN EXPRESS'
                  width={32}
                  height={22}
                />
                <span className='font-semibold text-sm'>AMERICAN EXPRESS</span>
              </Button>
            </div>
          </div>

          {error && (
            <div className='rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
              {error}
            </div>
          )}

          {/* Instructions from the gateway, once a payment has been started. */}
          {(virtualAccount || qrString || redirectUrl) && (
            <div className='flex flex-col gap-3 border rounded p-4'>
              {virtualAccount && (
                <div className='flex flex-col gap-1'>
                  <span className='text-text text-sm'>
                    Virtual account number
                  </span>
                  <span className='text-primary text-lg font-semibold break-all'>
                    {virtualAccount}
                  </span>
                </div>
              )}
              {qrString && (
                <div className='flex flex-col gap-1'>
                  <span className='text-text text-sm'>QRIS code</span>
                  <span className='text-primary text-xs break-all'>
                    {qrString}
                  </span>
                </div>
              )}
              {redirectUrl && (
                <Button variant='primary' asChild>
                  <a href={redirectUrl}>Continue to payment</a>
                </Button>
              )}
              <span className='text-text text-sm'>
                This page updates on its own once the payment is received.
              </span>
            </div>
          )}

          <Button
            variant='primary'
            className='w-full md:w-auto md:self-start mt-4'
            disabled={!selectedPaymentMethod || submitting}
            onClick={handleContinue}
          >
            {submitting ? 'Starting payment...' : 'Continue to Payment Details'}
          </Button>

          <div className='flex flex-col gap-4 mt-4'>
            <div className='flex items-center gap-2'>
              <MdSecurity className='text-primary' size={22} />
              <span className='text-primary font-bold text-lg'>
                Security Notice
              </span>
            </div>
            <p className='text-text text-base'>
              Our official payment link is only sent via WhatsApp from{' '}
              <strong>+62 9 915 7438</strong>. If you receive a payment request
              from another source, please ignore it and contact us immediately.
            </p>
          </div>
        </div>

        {/* Right Column - Help Box */}
        <div className='w-full h-fit lg:w-[340px] border shadow-sm'>
          <div className='bg-primary text-cream flex flex-col gap-1 px-6 py-3'>
            <span className='text-lg md:text-xl font-semibold'>
              Help & Payment Confirmation
            </span>
          </div>
          <div className='p-4 md:p-6 flex flex-col gap-4'>
            <div className='text-center border rounded p-3 text-text font-semibold'>
              Your payment will be verified within 5-10 minutes after
              completion!
            </div>
            <div className='flex gap-3 items-center'>
              <div className='relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='text-lg font-semibold text-primary'>
                  Samuel J.
                </span>
                <span className='text-text text-sm'>
                  Villa Customer Service for Bali
                </span>
              </div>
            </div>

            <Button
              variant='primary-outline'
              className='flex items-center gap-2'
            >
              <FaWhatsapp className='text-primary' size={18} />
              <span className='text-primary font-semibold text-sm md:text-base'>
                +62 361 123 4567
              </span>
            </Button>

            <Button
              variant='primary-outline'
              className='flex items-center gap-2'
            >
              <MdEmail className='text-primary' size={18} />
              <span className='text-primary font-semibold text-sm md:text-base'>
                support@lindvillas.com
              </span>
            </Button>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default PaymentMethods;
