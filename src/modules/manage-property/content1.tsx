import Image from 'next/image';
import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

const Content1ManageProperty = () => {
  return (
    <div className='py-8 md:py-12 lg:py-[64px]'>
      <BaseContainer>
        <div className='flex gap-8 md:gap-10 lg:gap-12 items-center justify-center lg:justify-between flex-col lg:flex-row'>
          <div className='flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[45%]'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-semibold text-primary'>
              Seamless Property Care & Management
            </h2>
            <p className='text-sm md:text-base lg:text-lg text-text'>
              From maintenance to optimization, our professional property
              management services ensure your villa remains in top condition,
              providing peace of mind while maximizing its value and potential.
            </p>
            <Button
              variant='primary-outline'
              className='flex items-center gap-2 w-fit mt-2'
            >
              <span>See Packages</span>
              <RiArrowRightUpLine size={20} />
            </Button>
          </div>
          <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[50%] max-w-[600px] overflow-hidden rounded shadow-sm'>
            <Image
              src='/images/media-7.png'
              alt='Property Management Services'
              width={0}
              height={0}
              sizes='(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 600px'
              className='w-full h-full object-cover aspect-[4/3]'
              priority
            />
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default Content1ManageProperty;
