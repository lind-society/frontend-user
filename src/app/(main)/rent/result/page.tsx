import { Metadata } from 'next';
import React from 'react';

import RentResultModules from '@/modules/rent-results';

export const metadata: Metadata = {
  title: 'Rent Results',
};

const RentPage = async () => {
  return <RentResultModules />;
};

export default RentPage;
