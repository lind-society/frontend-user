import React from 'react';

import ContentTourist1 from '@/modules/tourist-activity/content-1';
import GalleryImageTourist from '@/modules/tourist-activity/gallery-image';
import HeaderTouristActivity from '@/modules/tourist-activity/header';

const TouristActivityModules = () => {
  return (
    <>
      <HeaderTouristActivity />
      <ContentTourist1 />
      <GalleryImageTourist />
    </>
  );
};

export default TouristActivityModules;
