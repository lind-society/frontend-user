import { CheckCheck, Clock, CreditCard, MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaBath, FaStar, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

type ReservationStep =
  | 'additional-services'
  | 'payment-method'
  | 'payment-details';

interface ContentRentReservation1Props {
  currentStep: ReservationStep;
}

const ContentRentReservation1 = ({
  currentStep,
}: ContentRentReservation1Props) => {
  // Helper function to determine active step styles
  const getStepStyles = (step: number) => {
    const isActive =
      (step === 1 && currentStep === 'additional-services') ||
      (step === 2 && currentStep === 'payment-method') ||
      (step === 3 && currentStep === 'payment-details');

    const isCompleted =
      (step === 1 &&
        (currentStep === 'payment-method' ||
          currentStep === 'payment-details')) ||
      (step === 2 && currentStep === 'payment-details');

    if (isActive) {
      return 'border-2 border-primary bg-primary/10';
    } else if (isCompleted) {
      return 'border-2 border-primary bg-white';
    } else {
      return 'border-2 border-gray-200 bg-white';
    }
  };

  // Helper function to determine icon styles
  const getIconStyles = (step: number) => {
    const isActive =
      (step === 1 && currentStep === 'additional-services') ||
      (step === 2 && currentStep === 'payment-method') ||
      (step === 3 && currentStep === 'payment-details');

    const isCompleted =
      (step === 1 &&
        (currentStep === 'payment-method' ||
          currentStep === 'payment-details')) ||
      (step === 2 && currentStep === 'payment-details');

    if (isActive) {
      return 'bg-primary text-white';
    } else if (isCompleted) {
      return 'bg-green-500 text-white';
    } else {
      return 'bg-gray-200 text-gray-500';
    }
  };

  // Helper function for connecting line styles
  const getLineStyles = (step: number) => {
    const isCompleted =
      (step === 1 &&
        (currentStep === 'payment-method' ||
          currentStep === 'payment-details')) ||
      (step === 2 && currentStep === 'payment-details');

    if (isCompleted) {
      return 'bg-gradient-to-r from-green-500 to-green-500';
    } else {
      return 'bg-gradient-to-r from-gray-200 to-gray-200';
    }
  };

  return (
    <BaseContainer>
      <div className='flex flex-col gap-8 md:gap-12 justify-center items-center bg-white py-8 md:py-12 lg:py-16 px-10 lg:px-16 xl:px-20 rounded-lg shadow-md'>
        {/* Header section */}
        <div className='flex flex-col gap-4 md:gap-6 items-center xl:max-w-2xl'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-text text-center'>
            {currentStep === 'additional-services' && 'Reservation Received!'}
            {currentStep === 'payment-method' && 'Choose Payment Method'}
            {currentStep === 'payment-details' && 'Reservation Confirmed!'}
          </h2>
          <p className='text-center text-text font-light italic text-base md:text-lg'>
            {currentStep === 'additional-services' &&
              'Your villa reservation has been successfully submitted. A confirmation email has been sent to your inbox. Our team will reach out shortly to finalize the details.'}
            {currentStep === 'payment-method' &&
              'Please select your preferred payment method to secure your booking. We offer various secure payment options for your convenience.'}
            {currentStep === 'payment-details' &&
              "Your payment has been successfully processed. Your booking is now confirmed. You'll receive all the details via email and WhatsApp."}
          </p>
        </div>

        {/* Progress steps - Desktop */}
        <div className='hidden md:flex items-center justify-between w-full max-w-5xl'>
          {/* Step 1 */}
          <div
            className={`max-w-[280px] lg:max-w-[320px] h-full px-6 lg:px-9 py-5 flex flex-col gap-2.5 items-center rounded-lg shadow-sm ${getStepStyles(
              1
            )}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconStyles(
                1
              )}`}
            >
              {currentStep === 'additional-services' ? (
                <Clock size={24} />
              ) : (
                <CheckCheck size={24} />
              )}
            </div>
            <span className='text-text font-semibold text-center'>
              Additional Services
            </span>
            <span className='text-primary text-sm text-center'>
              Choose extra services to enhance your stay
            </span>
          </div>

          {/* Connecting line 1 */}
          <div
            className={`flex-1 h-0.5 max-w-[100px] lg:max-w-[150px] ${getLineStyles(
              1
            )}`}
          ></div>

          {/* Step 2 */}
          <div
            className={`max-w-[280px] lg:max-w-[320px] h-full px-6 lg:px-9 py-5 flex flex-col gap-2.5 items-center rounded-lg shadow-sm ${getStepStyles(
              2
            )}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconStyles(
                2
              )}`}
            >
              {currentStep === 'payment-method' ? (
                <CreditCard size={24} />
              ) : currentStep === 'payment-details' ? (
                <CheckCheck size={24} />
              ) : (
                <CreditCard size={24} />
              )}
            </div>
            <span className='text-text font-semibold text-center'>
              Payment Method
            </span>
            <span className='text-primary text-sm text-center'>
              Choose your preferred payment option
            </span>
          </div>

          {/* Connecting line 2 */}
          <div
            className={`flex-1 h-0.5 max-w-[100px] lg:max-w-[150px] ${getLineStyles(
              2
            )}`}
          ></div>

          {/* Step 3 */}
          <div
            className={`max-w-[280px] lg:max-w-[320px] h-full px-6 lg:px-9 py-5 flex flex-col gap-2.5 items-center rounded-lg shadow-sm ${getStepStyles(
              3
            )}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconStyles(
                3
              )}`}
            >
              <CheckCheck size={24} />
            </div>
            <span className='text-text font-semibold text-center'>
              Confirmation
            </span>
            <span className='text-primary text-sm text-center'>
              Your booking is confirmed and finalized
            </span>
          </div>
        </div>

        {/* Progress steps - Mobile (stacked) */}
        <div className='flex flex-col md:hidden gap-12 items-center w-full'>
          {/* Step 1 */}
          <div className='relative w-full max-w-[320px]'>
            <div
              className={`px-6 py-5 flex flex-col gap-2.5 items-center rounded-lg shadow-sm ${getStepStyles(
                1
              )}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconStyles(
                  1
                )}`}
              >
                {currentStep === 'additional-services' ? (
                  <Clock size={24} />
                ) : (
                  <CheckCheck size={24} />
                )}
              </div>
              <span className='text-text font-semibold text-center'>
                Additional Services
              </span>
              <span className='text-primary text-sm text-center'>
                Choose extra services to enhance your stay
              </span>
            </div>
            {/* Vertical connecting line */}
            <div
              className={`absolute left-1/2 -bottom-12 w-0.5 h-12 -translate-x-1/2 ${
                currentStep === 'payment-method' ||
                currentStep === 'payment-details'
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`}
            ></div>
          </div>

          {/* Step 2 */}
          <div className='relative w-full max-w-[320px]'>
            <div
              className={`px-6 py-5 flex flex-col gap-2.5 items-center rounded-lg shadow-sm ${getStepStyles(
                2
              )}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconStyles(
                  2
                )}`}
              >
                {currentStep === 'payment-method' ? (
                  <CreditCard size={24} />
                ) : currentStep === 'payment-details' ? (
                  <CheckCheck size={24} />
                ) : (
                  <CreditCard size={24} />
                )}
              </div>
              <span className='text-text font-semibold text-center'>
                Payment Method
              </span>
              <span className='text-primary text-sm text-center'>
                Choose your preferred payment option
              </span>
            </div>
            {/* Vertical connecting line */}
            <div
              className={`absolute left-1/2 -bottom-12 w-0.5 h-12 -translate-x-1/2 ${
                currentStep === 'payment-details'
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`}
            ></div>
          </div>

          {/* Step 3 */}
          <div className='w-full max-w-[320px]'>
            <div
              className={`px-6 py-5 flex flex-col gap-2.5 items-center rounded-lg shadow-sm ${getStepStyles(
                3
              )}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconStyles(
                  3
                )}`}
              >
                <CheckCheck size={24} />
              </div>
              <span className='text-text font-semibold text-center'>
                Confirmation
              </span>
              <span className='text-primary text-sm text-center'>
                Your booking is confirmed and finalized
              </span>
            </div>
          </div>
        </div>

        {/* Only show the reservation details on first and last steps */}
        {(currentStep === 'additional-services' ||
          currentStep === 'payment-details') && (
          <>
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
                        <span className='text-text text-sm font-medium'>
                          4.8
                        </span>
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
                  <Separator
                    orientation='vertical'
                    className='hidden sm:flex'
                  />
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
          </>
        )}

        <Separator />
      </div>
    </BaseContainer>
  );
};

export default ContentRentReservation1;
