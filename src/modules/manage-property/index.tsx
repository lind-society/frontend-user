import React from 'react';

import ContactUsManageProperty from '@/modules/manage-property/contact-us';
import Content1ManageProperty from '@/modules/manage-property/content1';
import Content2ManageProperty from '@/modules/manage-property/content2';
import HeaderManageProperty from '@/modules/manage-property/header';
import JoinUsManageProperty from '@/modules/manage-property/join-us';
import PackageManageProperty from '@/modules/manage-property/package';
import FaQRentPage from '@/modules/rent/faq';

const ManagePropertyModules = () => {
  return (
    <div className='bg-bg'>
      <HeaderManageProperty />
      <Content1ManageProperty />
      <JoinUsManageProperty />
      <Content2ManageProperty />
      <PackageManageProperty />
      <FaQRentPage />
      <ContactUsManageProperty />
    </div>
  );
};

export default ManagePropertyModules;
