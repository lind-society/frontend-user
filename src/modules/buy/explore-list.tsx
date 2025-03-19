import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

const ExploreListBuyPage = () => {
  return (
    <BaseContainer>
      <div className='flex justify-between'>
        <div className='flex flex-col '>
          <h4 className='text-primary w-[410px]'>
            You Can Explore <br /> Our Listings by
          </h4>
          <p className='text-text'>Browse available villas by period</p>
        </div>
        <div className='flex gap-6 items-center flex-wrap'>
          <Button variant='primary' className='flex items-center gap-2'>
            <span>Daily Rentals</span>
            <RiArrowRightUpLine size={20} className='text-white' />
          </Button>
          <Button variant='primary' className='flex items-center gap-2'>
            <span>Daily Rentals</span>
            <RiArrowRightUpLine size={20} className='text-white' />
          </Button>
          <Button variant='primary' className='flex items-center gap-2'>
            <span>Monthly Rentals</span>
            <RiArrowRightUpLine size={20} className='text-white' />
          </Button>
          <Button variant='primary' className='flex items-center gap-2'>
            <span>Yearly Rentals</span>
            <RiArrowRightUpLine size={20} className='text-white' />
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default ExploreListBuyPage;
