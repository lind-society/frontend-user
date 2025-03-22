import React from 'react';

import ContentRentDetail from '@/modules/rent-detail/content';
import ContentImage from '@/modules/rent-detail/content-image';
import HeaderRentDetail from '@/modules/rent-detail/header';

const RentDetailModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderRentDetail />
      <ContentRentDetail />
      <ContentImage />
    </div>
  );
};

export default RentDetailModules;
