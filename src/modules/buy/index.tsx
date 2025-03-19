import React from 'react';

import ExploreListBuyPage from '@/modules/buy/explore-list';
import HeaderBuy from '@/modules/buy/header/header';
import OurServiceBuyPage from '@/modules/buy/our-service';
import RentalPropertiesBuyPage from '@/modules/buy/rental-properties';
import WhyChooseLindBuyPage from '@/modules/buy/why-choose-lind';

const BuyModules = () => {
  return (
    <>
      <HeaderBuy />
      <RentalPropertiesBuyPage />
      <ExploreListBuyPage />
      <WhyChooseLindBuyPage />
      <OurServiceBuyPage />
    </>
  );
};

export default BuyModules;
