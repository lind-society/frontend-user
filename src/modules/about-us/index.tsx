import React from 'react';

import Content3AboutUs from '@/modules/about-us/conten3';
import Content1AboutUs from '@/modules/about-us/content1';
import Content2AboutUs from '@/modules/about-us/content2';
import HeaderAboutUs from '@/modules/about-us/header';
import JournalBanner from '@/modules/about-us/journal-banner';
import Ecosystem from '@/modules/landing-page/ecosystem';
import TrustBar from '@/modules/landing-page/trust-bar';
import WhyChooseUs from '@/modules/landing-page/why-choose-us';

const AboutUsModules = () => {
  return (
    <div>
      <HeaderAboutUs />
      <TrustBar />
      <Content1AboutUs />
      <Content2AboutUs />
      <WhyChooseUs />
      <Content3AboutUs />
      <JournalBanner />
      <Ecosystem />
    </div>
  );
};

export default AboutUsModules;
