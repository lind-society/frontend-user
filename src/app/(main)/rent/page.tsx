import { Metadata } from 'next';
import React from 'react';

import RentModules from '@/modules/rent';

export const metadata: Metadata = {
  title: 'Rent',
};

const RentPage = async () => {
  return <RentModules />;
};

export default RentPage;
