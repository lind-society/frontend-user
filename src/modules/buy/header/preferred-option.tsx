'use client';

import React from 'react';
import { BiSwim } from 'react-icons/bi';
import { FaParking, FaUmbrellaBeach } from 'react-icons/fa';
import { GrYoga } from 'react-icons/gr';
import { IoWifiOutline } from 'react-icons/io5';
import { MdKitchen, MdOutlinePets, MdOutlineSecurity } from 'react-icons/md';
import { PiMountainsDuotone } from 'react-icons/pi';
import { RiRoadMapLine } from 'react-icons/ri';
import { TbAirConditioning, TbGrill, TbMassage } from 'react-icons/tb';

import { Button } from '@/components/ui/button';

import { FiltersDialog } from '@/modules/buy/header/filter-dialog';
import { OptionCarousel } from '@/modules/buy/header/option-carousel';

interface PreferredOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export function PreferredOptions() {
  const preferredOptions: PreferredOption[] = [
    {
      id: 'air-cond',
      label: 'Air conditioner',
      icon: <TbAirConditioning size={24} />,
    },
    { id: 'pool', label: 'Pool', icon: <BiSwim size={24} /> },
    { id: 'kitchen', label: 'Kitchen', icon: <MdKitchen size={24} /> },
    { id: 'parking', label: 'Parking', icon: <FaParking size={24} /> },
    { id: 'beach', label: 'Beachfront', icon: <FaUmbrellaBeach size={24} /> },
    { id: 'wifi', label: 'Free WiFi', icon: <IoWifiOutline size={24} /> },
    { id: 'pets', label: 'Pet friendly', icon: <MdOutlinePets size={24} /> },
    {
      id: 'security',
      label: 'Security',
      icon: <MdOutlineSecurity size={24} />,
    },
    {
      id: 'mountain',
      label: 'Mountain view',
      icon: <PiMountainsDuotone size={24} />,
    },
    { id: 'massage', label: 'Massage', icon: <TbMassage size={24} /> },
    { id: 'bbq', label: 'BBQ grill', icon: <TbGrill size={24} /> },
    { id: 'yoga', label: 'Yoga', icon: <GrYoga size={24} /> },
    { id: 'seaview', label: 'Sea view', icon: <RiRoadMapLine size={24} /> },
  ];

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-lg md:text-[22px] text-primary font-semibold'>
          Most Preferred Options
        </span>
        <FiltersDialog />
      </div>

      <OptionCarousel>
        {preferredOptions.map((option) => (
          <Button
            key={option.id}
            variant='outline'
            className='flex items-center gap-2 min-w-max'
          >
            <span className='text-gray-500'>{option.icon}</span>
            <span className='text-xs font-medium text-gray-500'>
              {option.label}
            </span>
          </Button>
        ))}
      </OptionCarousel>
    </div>
  );
}
