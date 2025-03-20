import React from 'react';

import HeaderBuyPage from '@/modules/buy/header/header';
import RecomendationPropertiesBuyPage from '@/modules/buy/recomendation-properties';

const BuyModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderBuyPage />
      <RecomendationPropertiesBuyPage />
    </div>
  );
};

export default BuyModules;
