/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { FaHome, FaSearchDollar } from 'react-icons/fa';
import { GiIsland, GiPalmTree } from 'react-icons/gi';
import { IoWater } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import { Button } from '@/components/ui/button';

import { FiltersDialog } from '@/modules/rent/header/filter-dialog';
import { OptionCarousel } from '@/modules/rent/header/option-carousel';

interface PreferredOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface PreferredOptionsBuyPageProps {
  onFilterApply?: (filterData: any) => void;
}

export function PreferredOptionsBuyPage({
  onFilterApply,
}: PreferredOptionsBuyPageProps) {
  const router = useRouter();

  // Adding the preferred options
  const preferredOptions: PreferredOption[] = [
    {
      id: 'instant-income',
      label: 'Instant income',
      icon: <FaSearchDollar size={20} className='text-primary' />,
    },
    {
      id: 'rental-ready',
      label: 'Rental ready',
      icon: <FaHome size={20} className='text-primary' />,
    },
    {
      id: 'ocean-view',
      label: 'Ocean view',
      icon: <IoWater size={20} className='text-primary' />,
    },
    {
      id: 'high-end-luxury',
      label: 'High end luxury',
      icon: <MdOutlineVilla size={20} className='text-primary' />,
    },
    {
      id: 'jungle-view',
      label: 'Jungle view',
      icon: <GiPalmTree size={20} className='text-primary' />,
    },
    {
      id: 'land-plots',
      label: 'Land plots',
      icon: <GiIsland size={20} className='text-primary' />,
    },
  ];

  // Handle preferred option click
  const handleOptionClick = (optionId: string) => {
    const params = new URLSearchParams();
    params.append('preferredOption', optionId);
    router.push(`/buy/result?${params.toString()}`);
  };

  // Handle filter applications
  const handleFilterApply = (filterData: any) => {
    if (onFilterApply) {
      onFilterApply(filterData);
    } else {
      // Direct navigation if no parent handler provided
      const params = new URLSearchParams();
      if (filterData) {
        Object.entries(filterData).forEach(([key, value]) => {
          if (value) {
            params.append(key, value.toString());
          }
        });
      }
      router.push(`/buy/result?${params.toString()}`);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-lg md:text-[22px] text-primary font-semibold'>
          Most Preferred Options
        </span>
        <FiltersDialog onApply={handleFilterApply} />
      </div>

      <OptionCarousel>
        {preferredOptions.map((option) => (
          <Button
            key={option.id}
            variant='outline'
            className='flex items-center gap-2 min-w-max'
            onClick={() => handleOptionClick(option.id)}
          >
            <span className='text-primary'>{option.icon}</span>
            <span className='text-xs sm:text-sm font-medium text-gray-500'>
              {option.label}
            </span>
          </Button>
        ))}
      </OptionCarousel>
    </div>
  );
}
