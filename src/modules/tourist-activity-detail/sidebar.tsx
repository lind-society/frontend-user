'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '@/components/ui/button';

import { TouristActivity } from '@/modules/tourist-activity/constant';

interface SidebarProps {
  activity: TouristActivity;
  onGetTicket: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activity, onGetTicket }) => {
  const t = useTranslations('touristActivityDetail');

  return (
    <aside className='w-full lg:w-80 flex-shrink-0'>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='text-sm text-gray-500 mb-1'>{t('startFrom')}</div>
        <div className='text-2xl font-bold text-primary mb-1'>
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(activity.price)}
          <span className='text-base font-normal text-gray-500'>
            {t('pax')}
          </span>
        </div>
        <div className='text-sm text-gray-400 line-through mb-2'>
          IDR 150,000
        </div>
        <Button
          onClick={onGetTicket}
          className='w-full bg-primary text-white mb-2'
        >
          {t('findYourTicket')}
        </Button>
      </div>
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
        <div className='font-semibold mb-2'>{t('moreActivity')}</div>
        <div className='flex gap-3 items-center mb-2'>
          <Image
            src='/images/tourist-3.jpeg'
            alt='Tari Kecak'
            width={60}
            height={40}
            className='rounded-md object-cover'
          />
          <div>
            <div className='text-sm font-medium'>Tari Kecak</div>
            <div className='text-xs text-gray-500'>7 {t('pictures')}</div>
          </div>
        </div>
        <Button variant='outline' className='w-full text-xs'>
          {t('viewMore')}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
