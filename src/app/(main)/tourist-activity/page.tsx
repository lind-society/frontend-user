import { Metadata } from 'next';
import React from 'react';

import TouristActivityModules from '@/modules/tourist-activity';

export const metadata: Metadata = {
  title: 'Tourist Activity',
};

const BuyResultPage = async () => {
  return <TouristActivityModules />;
};

export default BuyResultPage;
