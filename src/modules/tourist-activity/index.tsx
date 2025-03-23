import React from 'react';

import FaQRentPage from '@/modules/rent/faq';
import ContentTourist1 from '@/modules/tourist-activity/content-1';
import ExploreTourist from '@/modules/tourist-activity/explore';
import GalleryImageTourist from '@/modules/tourist-activity/gallery-image';
import HeaderTouristActivity from '@/modules/tourist-activity/header';

const TouristActivityModules = () => {
  return (
    <>
      <HeaderTouristActivity />
      <ContentTourist1 />
      <GalleryImageTourist />
      <ExploreTourist />
      <FaQRentPage />
    </>
  );
};

export default TouristActivityModules;
