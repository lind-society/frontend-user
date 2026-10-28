import Image from 'next/image';
import React from 'react';

import BaseContainer from '@/components/layouts/container';

const HeaderManageProperty = () => {
  return (
    <div className='py-6 md:pt-[52px] md:pb-[132px] relative'>
      <Image
        src='/images/header-manage-property.jpeg'
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-full object-cover absolute top-0 left-0 '
        alt='header landing page'
      />
      <div className='bg-ink/30 absolute top-0 left-0 w-full h-full'></div>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 justify-center relative'>
          {/* Responsive header content */}
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[567px] mb-8 lg:mb-0'>
              <h1 className='text-cream h0 font-bold'>
                Choose the Perfect Plan for Your Property
              </h1>
              <div className='px-3 md:px-5 border-white border-solid border-l-2 text-cream text-lg md:text-[22px]'>
                Flexible property management solutions tailored to your needs.
              </div>
            </div>

            {/* Stats - Hidden on smaller screens */}
            <div className='hidden md:flex flex-row lg:flex-col gap-6 text-cream'>
              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className=' font-bold'>12k+</h2>
                <span className='text-base md:text-xl'>Satisfied Visitors</span>
              </div>

              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className=' font-bold'>4.5k+</h2>
                <span className='text-base md:text-xl'>
                  Amazing Tour Guides
                </span>
              </div>

              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className=' font-bold'>2k+</h2>
                <span className='text-base md:text-xl'>Managed Properties</span>
              </div>
            </div>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderManageProperty;
