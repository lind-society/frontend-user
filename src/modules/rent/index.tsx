import React from 'react';

import ExploreListRentPage from '@/modules/rent/explore-list';
import FaQRentPage from '@/modules/rent/faq';
import HeaderRentPage from '@/modules/rent/header/header';
import OurServiceRentPage from '@/modules/rent/our-service';
import RentalPropertiesRentPage from '@/modules/rent/rental-properties';
import WhyChooseLindRentPage from '@/modules/rent/why-choose-lind';

const RentModules = () => {
  return (
    <>
      <HeaderRentPage />
      <RentalPropertiesRentPage />
      <ExploreListRentPage />
      <WhyChooseLindRentPage />
      <OurServiceRentPage />
      <FaQRentPage />
    </>
  );
};

export default RentModules;
