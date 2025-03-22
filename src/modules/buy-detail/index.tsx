import React from 'react';

import ContentBuyDetail from '@/modules/buy-detail/content';
import ContentImage from '@/modules/rent-detail/content-image';
import HeaderRentDetail from '@/modules/rent-detail/header';

const BuyDetailModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderRentDetail />
      <ContentBuyDetail />
      <ContentImage />
    </div>
  );
};

export default BuyDetailModules;
