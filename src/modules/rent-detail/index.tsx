import React from 'react';

import ContentRentDetail from '@/modules/rent-detail/content';
import HeaderRentDetail from '@/modules/rent-detail/header';

const RentDetailModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderRentDetail />
      <ContentRentDetail />
    </div>
  );
};

export default RentDetailModules;
