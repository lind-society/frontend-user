'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';

const HeaderTouristActivity = () => {
  const t = useTranslations('touristActivity.header');

  return (
    <div className='py-[64px]'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <BreadcrumbLayout
            items={[
              { label: t('breadcrumb.home'), href: '/' },

              {
                label: t('breadcrumb.touristActivity'),
                href: '/tourist-activity',
                isActive: true,
              },
            ]}
          />
          <div className='flex flex-col gap-2 text-center items-center'>
            <h1 className='text-ink'>{t('title')}</h1>
            <span className='max-w-[850px] text-text'>{t('subtitle')}</span>
          </div>
          <Image
            src='/images/header-tourist.jpeg'
            width={0}
            height={0}
            sizes='100vw'
            className='w-full max-h-[650px] object-cover'
            alt='tourist header'
          />
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderTouristActivity;
