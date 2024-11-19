// components/LogoutButton.tsx

'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { MdLogout } from 'react-icons/md';

const LogoutButton: React.FC = () => {
  const t = useTranslations('navbar');

  const handleLogout = async () => {
    signOut();
  };

  return (
    <button
      onClick={handleLogout}
      className='text-sm flex items-center gap-2 text-primary-red py-1 hover:bg-blue-50'
    >
      <MdLogout className='text-2xl text-primary-red' />
      {t('profile.logout')}
    </button>
  );
};

export default LogoutButton;
