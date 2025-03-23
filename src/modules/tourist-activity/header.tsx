import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';

const HeaderTouristActivity = () => {
  return (
    <div className='py-[64px]'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <BreadcrumbLayout
            items={[
              { label: 'Home', href: '/' },

              {
                label: 'Tourist Activity',
                href: '/tourist-activity',
                isActive: true,
              },
            ]}
          />
          <div className='flex flex-col gap-2 text-center items-center'>
            <h4 className='text-primary'>Wellness</h4>
            <span className='max-w-[850px] text-text'>
              Prioritize your well-being with transformative wellness
              experiences tailored to soothe, heal, and revitalize. Explore
              holistic therapies, mindful meditation, and rejuvenating spa
              treatments that restore harmony and balance in your daily life.
            </span>
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
