import React from 'react';

import ExploreListRentPage from '@/modules/rent/explore-list';
import FaQRentPage from '@/modules/rent/faq';
import HeaderRentPage from '@/modules/rent/header/header';
import OurServiceRentPage from '@/modules/rent/our-service';
import RentalPropertiesRentPage from '@/modules/rent/rental-properties';
import WhyChooseLindRentPage from '@/modules/rent/why-choose-lind';

const RentModules = () => {
  return (
    // page background lives here, not on each section — FaQRentPage in
    // particular is shared with Manage Property, which sits on bone
    <div className='bg-cream-light'>
      <HeaderRentPage />
      <RentalPropertiesRentPage />
      <ExploreListRentPage />
      <WhyChooseLindRentPage />
      <OurServiceRentPage />
      <FaQRentPage />
    </div>
  );
};

export default RentModules;
