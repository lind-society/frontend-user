import React from 'react';

import DreamHomeBuyPage from '@/modules/buy/dream-home';
import HeaderBuyPage from '@/modules/buy/header/header';
import RecomendationPropertiesBuyPage from '@/modules/buy/recomendation-properties';
import TrustedBuyerSection from '@/modules/buy/trusted-buyer';
import FaQRentPage from '@/modules/rent/faq';

const BuyModules = () => {
  return (
    <div className='bg-cream-light'>
      <HeaderBuyPage />
      <RecomendationPropertiesBuyPage />
      <TrustedBuyerSection />
      <DreamHomeBuyPage />
      <FaQRentPage />
    </div>
  );
};

export default BuyModules;
