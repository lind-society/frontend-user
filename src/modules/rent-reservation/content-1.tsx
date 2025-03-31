import { CheckCheck, Clock, CreditCard, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaBath, FaStar, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ContentRentReservation1 = () => {
  return (
    <BaseContainer>
      <div className='flex flex-col gap-8 md:gap-12 justify-center items-center bg-white py-8 md:py-12 lg:py-16 px-10 lg:px-16 xl:px-20 rounded-lg shadow-md'>
        {/* Header section */}
        <div className='flex flex-col gap-4 md:gap-6 items-center xl:max-w-2xl'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-text text-center'>
            Reservation Received!
          </h2>
          <p className='text-center text-text font-light italic text-base md:text-lg'>
            "Your villa reservation has been successfully submitted. A
            confirmation email has been sent to your inbox. Our team will reach
            out shortly to finalize the details."
          </p>
        </div>

        {/* Progress steps - Desktop */}
        <div className='hidden md:flex items-center justify-between w-full max-w-5xl'>
          {/* Step 1 */}
          <div className='max-w-[280px] lg:max-w-[320px] h-max px-6 lg:px-9 py-5 flex flex-col gap-2.5 items-center rounded-lg border-2 border-primary bg-white shadow-sm'>
            <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white'>
              <CheckCheck size={24} />
            </div>
            <span className='text-text font-semibold text-center'>
              Reservation Submitted
            </span>
            <span className='text-primary text-sm text-center'>
              We've received your request for the villa stay.
            </span>
          </div>

          {/* Connecting line 1 */}
          <div className='flex-1 h-0.5 bg-gradient-to-r from-primary to-primary max-w-[100px] lg:max-w-[150px]'></div>

          {/* Step 2 */}
          <div className='max-w-[280px] lg:max-w-[320px] h-max px-6 lg:px-9 py-5 flex flex-col gap-2.5 items-center rounded-lg border-2 border-primary bg-white shadow-sm'>
            <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white'>
              <Clock size={24} />
            </div>
            <span className='text-text font-semibold text-center'>
              Processing Your Booking
            </span>
            <span className='text-primary text-sm text-center'>
              Our concierge team is verifying availability and additional
              details.
            </span>
          </div>

          {/* Connecting line 2 */}
          <div className='flex-1 h-0.5 bg-gradient-to-r from-primary to-primary max-w-[100px] lg:max-w-[150px]'></div>

          {/* Step 3 */}
          <div className='max-w-[280px] lg:max-w-[320px] h-max px-6 lg:px-9 py-5 flex flex-col gap-2.5 items-center rounded-lg border-2 border-primary bg-white shadow-sm'>
            <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white'>
              <CreditCard size={24} />
            </div>
            <span className='text-text font-semibold text-center'>
              Secure Your Stay
            </span>
            <span className='text-primary text-sm text-center'>
              Once confirmed, payment details will be provided for finalization.
            </span>
          </div>
        </div>

        {/* Progress steps - Mobile (stacked) */}
        <div className='flex flex-col md:hidden gap-12 items-center w-full'>
          {/* Step 1 */}
          <div className='relative w-full max-w-[320px]'>
            <div className='px-6 py-5 flex flex-col gap-2.5 items-center rounded-lg border-2 border-primary bg-white shadow-sm'>
              <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white'>
                <CheckCheck size={24} />
              </div>
              <span className='text-text font-semibold text-center'>
                Reservation Submitted
              </span>
              <span className='text-primary text-sm text-center'>
                We've received your request for the villa stay.
              </span>
            </div>
            {/* Vertical connecting line */}
            <div className='absolute left-1/2 -bottom-12 w-0.5 h-10 bg-primary -translate-x-1/2'></div>
          </div>

          {/* Step 2 */}
          <div className='relative w-full max-w-[320px]'>
            <div className='px-6 py-5 flex flex-col gap-2.5 items-center rounded-lg border-2 border-primary bg-white shadow-sm'>
              <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white'>
                <Clock size={24} />
              </div>
              <span className='text-text font-semibold text-center'>
                Processing Your Booking
              </span>
              <span className='text-primary text-sm text-center'>
                Our concierge team is verifying availability and additional
                details.
              </span>
            </div>
            {/* Vertical connecting line */}
            <div className='absolute left-1/2 -bottom-12 w-0.5 h-10 bg-primary -translate-x-1/2'></div>
          </div>

          {/* Step 3 */}
          <div className='w-full max-w-[320px]'>
            <div className='px-6 py-5 flex flex-col gap-2.5 items-center rounded-lg border-2 border-primary bg-white shadow-sm'>
              <div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white'>
                <CreditCard size={24} />
              </div>
              <span className='text-text font-semibold text-center'>
                Secure Your Stay
              </span>
              <span className='text-primary text-sm text-center'>
                Once confirmed, payment details will be provided for
                finalization.
              </span>
            </div>
          </div>
        </div>
        <Separator />
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-7 w-full'>
          {/* Villa image - responsive sizing */}
          <div className='w-full lg:w-[470px] lg:flex-shrink-0'>
            <Image
              src='/images/explore-2.png'
              width={0}
              height={0}
              alt='LIND Villa property view'
              className='w-full h-[300px] md:h-[350px] lg:h-[380px] object-cover rounded-lg shadow-md'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 470px'
              priority
            />
          </div>

          {/* Villa details - responsive layout */}
          <div className='flex flex-col gap-4 sm:gap-6 flex-1'>
            {/* Title and location section */}
            <div className='flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center w-full'>
              <div className='flex flex-col gap-2 sm:gap-3'>
                <div className='flex gap-2 items-center'>
                  <span className='text-xl md:text-2xl text-text font-semibold'>
                    LIND Villa
                  </span>
                  <div className='flex items-center gap-1'>
                    <FaStar className='text-primary' />
                    <span className='text-text text-sm font-medium'>4.8</span>
                  </div>
                </div>
                <span className='text-text text-xs sm:text-sm'>
                  Jl. Raya Ubud No. 25, Ubud, Gianyar, Bali 80571, Indonesia
                </span>
              </div>
              <Button
                variant='primary'
                className='flex items-center gap-2 text-xs sm:text-sm'
                size='sm'
              >
                <MapPin size={16} />
                <span className='font-semibold'>View on map</span>
              </Button>
            </div>

            {/* Property features */}
            <div className='flex items-center gap-3 md:gap-4'>
              <div className='flex items-center gap-1.5'>
                <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
                  <IoBed className='text-primary' size={12} />
                </div>
                <span className='text-sm md:text-base'>8 beds</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
                  <FaBath className='text-primary' size={12} />
                </div>
                <span className='text-sm md:text-base'>4 baths</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
                  <FaUser className='text-primary' size={12} />
                </div>
                <span className='text-sm md:text-base'>4 guests</span>
              </div>
            </div>

            {/* Check-in/out dates */}
            <div className='flex gap-4 sm:gap-8'>
              <div className='flex flex-col gap-1'>
                <span className='text-text text-sm'>Check-in</span>
                <span className='text-primary text-sm font-semibold'>
                  25th May 2024
                </span>
              </div>
              <Separator orientation='vertical' className='hidden sm:flex' />
              <div className='flex flex-col gap-1'>
                <span className='text-text text-sm'>Check-out</span>
                <span className='text-primary text-sm font-semibold'>
                  30th May 2024
                </span>
              </div>
            </div>

            {/* Price details */}
            <div className='flex flex-col gap-2 w-full sm:max-w-[405px] mt-2'>
              <span className='text-text text-sm font-semibold'>
                Price Details
              </span>
              <Separator />
              <div className='flex justify-between text-text text-xs sm:text-sm'>
                <span>IDR 4,900,000 x 7 nights</span>
                <span>IDR 34,900,000</span>
              </div>
              <div className='flex justify-between text-text text-xs sm:text-sm'>
                <span>Booking.com service fee</span>
                <span>IDR 400,000</span>
              </div>
              <Separator />
              <div className='flex justify-between text-text text-sm font-semibold'>
                <span>Total</span>
                <span>IDR 35,300,000</span>
              </div>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </BaseContainer>
  );
};

export default ContentRentReservation1;
