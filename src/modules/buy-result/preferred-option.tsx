'use client';

import React, { useState } from 'react';
import { FaHome, FaSearchDollar } from 'react-icons/fa';
import { GiIsland, GiPalmTree } from 'react-icons/gi';
import { IoWater } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

import { Button } from '@/components/ui/button';

import { OptionCarousel } from '@/modules/rent/header/option-carousel';

interface PreferredOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export const PreferredOptions = () => {
  const [options, setOptions] = useState<PreferredOption[]>([
    {
      id: 'instant-income',
      label: 'Instant income',
      icon: <FaSearchDollar size={20} />,
      selected: false,
    },
    {
      id: 'rental-ready',
      label: 'Rental ready',
      icon: <FaHome size={20} />,
      selected: false,
    },
    {
      id: 'ocean-view',
      label: 'Ocean view',
      icon: <IoWater size={20} />,
      selected: false,
    },
    {
      id: 'high-end-luxury',
      label: 'High end luxury',
      icon: <MdOutlineVilla size={20} />,
      selected: false,
    },
    {
      id: 'jungle-view',
      label: 'Jungle view',
      icon: <GiPalmTree size={20} />,
      selected: false,
    },
    {
      id: 'land-plots',
      label: 'Land plots',
      icon: <GiIsland size={20} />,
      selected: false,
    },
  ]);

  // Handle option toggle
  const handleToggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, selected: !option.selected } : option
      )
    );
  };

  // Handle clear all
  const handleClearAll = () => {
    setOptions((prev) =>
      prev.map((option) => ({ ...option, selected: false }))
    );
  };

  // Split options for better responsive layout on smaller screens
  const halfLength = Math.ceil(options.length / 2);
  const firstHalf = options.slice(0, halfLength);
  const secondHalf = options.slice(halfLength);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-lg md:text-[22px] text-primary font-semibold'>
          Most Preferred Options
        </span>
        <Button
          variant='link'
          className='text-text text-sm font-medium p-0'
          onClick={handleClearAll}
        >
          Clear
        </Button>
      </div>

      <OptionCarousel className='md:hidden'>
        {options.map((option) => (
          <Button
            key={option.id}
            variant={option.selected ? 'default' : 'outline'}
            className={`flex items-center gap-2 min-w-max ${
              option.selected ? 'bg-primary text-white' : 'text-gray-500'
            }`}
            onClick={() => handleToggleOption(option.id)}
          >
            <span className={option.selected ? 'text-white' : 'text-gray-500'}>
              {option.icon}
            </span>
            <span
              className={`text-xs font-medium ${
                option.selected ? 'text-white' : 'text-gray-500'
              }`}
            >
              {option.label}
            </span>
          </Button>
        ))}
      </OptionCarousel>

      <div className='hidden md:block'>
        <OptionCarousel>
          <div className='grid grid-rows-2 gap-4'>
            <div className='flex gap-3 items-center'>
              {firstHalf.map((option) => (
                <Button
                  key={option.id}
                  variant={option.selected ? 'default' : 'outline'}
                  className={`flex items-center gap-2 min-w-max ${
                    option.selected ? 'bg-primary text-white' : 'text-gray-500'
                  }`}
                  onClick={() => handleToggleOption(option.id)}
                >
                  <span
                    className={option.selected ? 'text-white' : 'text-gray-500'}
                  >
                    {option.icon}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      option.selected ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {option.label}
                  </span>
                </Button>
              ))}
            </div>
            <div className='flex gap-3 items-center'>
              {secondHalf.map((option) => (
                <Button
                  key={option.id}
                  variant={option.selected ? 'default' : 'outline'}
                  className={`flex items-center gap-2 min-w-max ${
                    option.selected ? 'bg-primary text-white' : 'text-gray-500'
                  }`}
                  onClick={() => handleToggleOption(option.id)}
                >
                  <span
                    className={option.selected ? 'text-white' : 'text-gray-500'}
                  >
                    {option.icon}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      option.selected ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {option.label}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </OptionCarousel>
      </div>
    </div>
  );
};
