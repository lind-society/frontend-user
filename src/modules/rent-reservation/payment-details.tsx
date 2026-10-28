import Image from 'next/image';
import React from 'react';
import { FaCheck, FaWhatsapp } from 'react-icons/fa6';
import {
  MdCalendarMonth,
  MdEmail,
  MdPayment,
  MdSecurity,
} from 'react-icons/md';

import BaseContainer from '@/components/layouts/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { ReservationBookingView } from './booking-view';

interface PaymentDetailsProps {
  /**
   * A real booking. Without it this screen keeps the placeholder transaction it
   * has always shown on `/rent/[name]/reservation`.
   */
  booking?: ReservationBookingView;
}

const PaymentDetails = ({ booking }: PaymentDetailsProps = {}) => {
  return (
    <BaseContainer>
      <div className='flex flex-col lg:flex-row justify-between bg-cream-light py-8 md:py-12 px-5 md:px-10 lg:px-16 rounded shadow-sm gap-6'>
        {/* Left Column - Payment Details */}
        <div className='py-4 flex-1 flex flex-col gap-5'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center'>
              <FaCheck className='text-cream' size={16} />
            </div>
            <h3 className='text-xl md:text-2xl font-semibold text-primary'>
              Payment Completed
            </h3>
          </div>

          <p className='text-text text-base md:text-lg'>
            Thank you for your payment. Your villa reservation is now confirmed.
            We've sent a confirmation email with all the details to your
            registered email address.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-2'>
            <Button
              variant='primary-outline'
              className='flex justify-start items-center gap-2'
            >
              <div className='h-6 w-6 bg-tertiary flex items-center justify-center rounded-full'>
                <MdPayment className='text-primary' size={14} />
              </div>
              <span className='text-sm text-primary font-semibold'>
                ID Transaksi: #{booking?.reference ?? 'TRX202502054321'}
              </span>
            </Button>
            <Button
              variant='primary-outline'
              className='flex justify-start items-center gap-2'
            >
              <div className='h-6 w-6 bg-tertiary flex items-center justify-center rounded-full'>
                <MdCalendarMonth className='text-primary' size={14} />
              </div>
              <span className='text-sm text-primary font-semibold'>
                {booking?.paidAt
                  ? new Intl.DateTimeFormat('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date(booking.paidAt))
                  : 'February 5, 2025'}
              </span>
            </Button>
            <Button
              variant='primary-outline'
              className='flex justify-start items-center gap-2 sm:col-span-2'
            >
              <div className='h-6 w-6 bg-tertiary flex items-center justify-center rounded-full'>
                <Image
                  src='/images/bca.svg'
                  alt='BCA'
                  width={14}
                  height={14}
                  className='object-contain'
                />
              </div>
              <span className='text-sm text-primary font-semibold'>
                {booking?.paidChannel
                  ? `Paid via ${booking.paidChannel}`
                  : 'Paid via Virtual Account (BCA)'}
              </span>
            </Button>
          </div>

          <div className='mt-4'>
            <span className='text-xl text-primary font-bold'>Next Steps</span>
            <ul className='mt-3 space-y-3'>
              <li className='flex gap-3'>
                <span className='text-primary text-xl'>📩</span>
                <span className='text-text'>
                  <strong>Confirmation Email Sent:</strong> Please check your
                  inbox for the confirmation details.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-primary text-xl'>📲</span>
                <span className='text-text'>
                  <strong>WhatsApp Notification:</strong> You will receive
                  check-in instructions via WhatsApp from +62 9 915 7438.
                </span>
              </li>
              <li className='flex gap-3'>
                <span className='text-primary text-xl'>🏡</span>
                <span className='text-text'>
                  <strong>Check-in Instructions:</strong> Detailed information
                  on villa access and services will be sent 24 hours before
                  arrival.
                </span>
              </li>
            </ul>
          </div>

          <div className='flex flex-col gap-2 mt-4 border-t pt-4'>
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

          <Button
            variant='primary'
            className='w-full sm:w-auto mt-6'
            onClick={() => (window.location.href = '/')}
          >
            Return to Homepage
          </Button>
        </div>

        {/* Right Column - Help Box */}
        <div className='w-full h-fit lg:w-[340px] border shadow-sm'>
          <div className='bg-primary text-cream flex flex-col gap-1 px-6 py-3'>
            <span className='text-lg md:text-xl font-semibold'>
              Need Assistance?
            </span>
          </div>
          <div className='p-4 md:p-6 flex flex-col gap-4'>
            <div className='text-center border rounded bg-green-50 p-4 text-green-700 font-semibold'>
              Your booking is confirmed!
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

export default PaymentDetails;
