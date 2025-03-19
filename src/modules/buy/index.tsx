import React from 'react';

import ExploreListBuyPage from '@/modules/buy/explore-list';
import HeaderBuy from '@/modules/buy/header/header';
import RentalPropertiesBuyPage from '@/modules/buy/rental-properties';

const BuyModules = () => {
  return (
    <>
      <HeaderBuy />
      <RentalPropertiesBuyPage />
      <ExploreListBuyPage />
    </>
  );
};

export default BuyModules;
