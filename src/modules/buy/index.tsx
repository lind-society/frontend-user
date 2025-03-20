import React from 'react';

import HeaderBuyPage from '@/modules/buy/header/header';
import RecomendationPropertiesBuyPage from '@/modules/buy/recomendation-properties';
import TrustedBuyerSection from '@/modules/buy/trusted-buyer';

const BuyModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderBuyPage />
      <RecomendationPropertiesBuyPage />
      <TrustedBuyerSection />
    </div>
  );
};

export default BuyModules;
