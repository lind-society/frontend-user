import { Metadata } from 'next';
import React from 'react';

import MediaModules from '@/modules/media';

export const metadata: Metadata = {
  title: 'Media',
};

const ContactUsPage = async () => {
  return <MediaModules />;
};

export default ContactUsPage;
