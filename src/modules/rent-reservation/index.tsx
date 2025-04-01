'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AdditionalService from '@/modules/rent-reservation/additional-service';
import ContentRentReservation1 from '@/modules/rent-reservation/content-1';
import PaymentDetails from '@/modules/rent-reservation/payment-details';
import PaymentMethods from '@/modules/rent-reservation/payment-method';

type ReservationStep =
  | 'additional-services'
  | 'payment-method'
  | 'payment-details';

const RentReservation = ({ name }: { name: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const villaName = name;
  // Get step from URL or default to first step
  const [currentStep, setCurrentStep] = useState<ReservationStep>(
    'additional-services'
  );

  // Update step when URL changes
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (
      stepParam === 'additional-services' ||
      stepParam === 'payment-method' ||
      stepParam === 'payment-details'
    ) {
      setCurrentStep(stepParam as ReservationStep);
    } else if (stepParam) {
      // If invalid step parameter, redirect to the first step
      router.replace(`/rent/${villaName}/reservation?step=additional-services`);
    } else {
      // If no step parameter, add it to URL
      router.replace(`/rent/${villaName}/reservation?step=additional-services`);
    }
  }, [searchParams, router, villaName]);

  // Handle step navigation
  const goToNextStep = () => {
    let nextStep: ReservationStep;

    if (currentStep === 'additional-services') {
      nextStep = 'payment-method';
    } else if (currentStep === 'payment-method') {
      nextStep = 'payment-details';
    } else {
      // We're already at the last step, so we stay there
      nextStep = 'payment-details';
    }

    router.push(`/rent/${villaName}/reservation?step=${nextStep}`);
  };

  return (
    <div className='bg-bg py-[32px] md:py-[64px] flex flex-col gap-6'>
      <ContentRentReservation1 currentStep={currentStep} />

      {currentStep === 'additional-services' && (
        <AdditionalService onContinue={goToNextStep} />
      )}

      {currentStep === 'payment-method' && (
        <PaymentMethods onContinue={goToNextStep} />
      )}

      {currentStep === 'payment-details' && <PaymentDetails />}
    </div>
  );
};

export default RentReservation;
