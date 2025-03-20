import { Metadata } from 'next';
import React from 'react';

import BuyResultModules from '@/modules/buy-result';

export const metadata: Metadata = {
  title: 'Buy Results',
};

const BuyResultPage = async () => {
  return <BuyResultModules />;
};

export default BuyResultPage;
