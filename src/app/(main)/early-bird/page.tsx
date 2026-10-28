import { Metadata } from 'next';
import React from 'react';

import EarlyBirdModules from '@/modules/early-bird';

export const metadata: Metadata = {
  title: 'Early Bird Offer',
};

const EarlyBirdPage = async () => {
  return <EarlyBirdModules />;
};

export default EarlyBirdPage;
