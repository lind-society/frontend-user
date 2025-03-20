/* eslint-disable no-console */
'use client';

import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';

interface ExploreOptionProps {
  label: string;
  onClick?: () => void;
}

const ExploreOption: React.FC<ExploreOptionProps> = ({ label, onClick }) => (
  <Button
    variant='primary'
    className='flex items-center gap-2 whitespace-nowrap w-full sm:w-auto'
    onClick={onClick}
  >
    <span>{label}</span>
    <RiArrowRightUpLine size={20} className='text-white' />
  </Button>
);

const ExploreListRentPage = () => {
  const exploreOptions = [
    {
      label: 'Daily Rentals',
      onClick: () => console.log('Daily Rentals clicked'),
    },
    {
      label: 'Monthly Rentals',
      onClick: () => console.log('Monthly Rentals clicked'),
    },
    {
      label: 'Yearly Rentals',
      onClick: () => console.log('Yearly Rentals clicked'),
    },
  ];

  return (
    <div className='bg-gray-50'>
      <BaseContainer>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-6 py-8 md:py-12 lg:py-16'>
          {/* Header Section - Responsive column on mobile, row on desktop */}
          <div className='flex flex-col gap-2 lg:max-w-[410px]'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-primary'>
              You Can Explore <br className='hidden md:block' /> Our Listings by
            </h2>
            <p className='text-base md:text-lg text-text'>
              Browse available villas by rental period
            </p>
          </div>

          {/* Buttons Section - Responsive grid layout */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:flex lg:flex-wrap lg:items-center'>
            {exploreOptions.map((option, index) => (
              <ExploreOption
                key={index}
                label={option.label}
                onClick={option.onClick}
              />
            ))}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ExploreListRentPage;
