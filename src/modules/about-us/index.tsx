import React from 'react';

import Content3AboutUs from '@/modules/about-us/conten3';
import Content1AboutUs from '@/modules/about-us/content1';
import Content2AboutUs from '@/modules/about-us/content2';
import HeaderAboutUs from '@/modules/about-us/header';
import ContactUsManageProperty from '@/modules/manage-property/contact-us';

const AboutUsModules = () => {
  return (
    <div>
      <HeaderAboutUs />
      <Content1AboutUs />
      <Content2AboutUs />
      <Content3AboutUs />
      <ContactUsManageProperty />
    </div>
  );
};

export default AboutUsModules;
