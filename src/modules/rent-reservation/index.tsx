import React from 'react';

import AdditionalService from '@/modules/rent-reservation/additional-service';
import ContentRentReservation1 from '@/modules/rent-reservation/content-1';
import PaymentMethods from '@/modules/rent-reservation/payment-method';

const RentReservation = () => {
  return (
    <div className='bg-bg py-[64px] flex flex-col gap-6'>
      <ContentRentReservation1 />
      <AdditionalService />
      <PaymentMethods />
    </div>
  );
};

export default RentReservation;
