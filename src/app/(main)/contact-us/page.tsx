import { Metadata } from 'next';
import React from 'react';

import ContactUsModules from '@/modules/contact-us';

export const metadata: Metadata = {
  title: 'Contact Us',
};

const ContactUsPage = async () => {
  return <ContactUsModules />;
};

export default ContactUsPage;
