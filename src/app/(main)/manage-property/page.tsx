import { Metadata } from 'next';
import React from 'react';

import ManagePropertyModules from '@/modules/manage-property';

export const metadata: Metadata = {
  title: 'Manage Property',
};

const ManagePropertyPage = async () => {
  return <ManagePropertyModules />;
};

export default ManagePropertyPage;
