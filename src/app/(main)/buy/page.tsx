import { Metadata } from 'next';
import React from 'react';

import BuyModules from '@/modules/buy';

export const metadata: Metadata = {
  title: 'Buy',
};

const BuyPage = async () => {
  return <BuyModules />;
};

export default BuyPage;
