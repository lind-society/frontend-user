import { Metadata } from 'next';
import React from 'react';

import AboutUsModules from '@/modules/about-us';

export const metadata: Metadata = {
  title: 'About Us',
};

const AboutUsPage = async () => {
  return <AboutUsModules />;
};

export default AboutUsPage;
