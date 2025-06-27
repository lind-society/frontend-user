/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app'; // Import router
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

import { FiltersDialog } from '@/modules/rent/header/filter-dialog';
import { OptionCarousel } from '@/modules/rent/header/option-carousel';

interface PreferredOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface PreferredOptionsProps {
  onFilterApply?: (filterData: any) => void;
}

export function PreferredOptions({ onFilterApply }: PreferredOptionsProps) {
  const t = useTranslations('rent.preferredOptions');
  const router = useRouter(); // Initialize router

  const preferredOptions: PreferredOption[] = [
    {
      id: 'air-cond',
      label: t('amenities.airConditioner'),
      icon: <TbAirConditioning size={24} />,
    },
    { id: 'pool', label: t('amenities.pool'), icon: <BiSwim size={24} /> },
    {
      id: 'kitchen',
      label: t('amenities.kitchen'),
      icon: <MdKitchen size={24} />,
    },
    {
      id: 'parking',
      label: t('amenities.parking'),
      icon: <FaParking size={24} />,
    },
    {
      id: 'beach',
      label: t('amenities.beachfront'),
      icon: <FaUmbrellaBeach size={24} />,
    },
    {
      id: 'wifi',
      label: t('amenities.freeWifi'),
      icon: <IoWifiOutline size={24} />,
    },
    {
      id: 'pets',
      label: t('amenities.petFriendly'),
      icon: <MdOutlinePets size={24} />,
    },
    {
      id: 'security',
      label: t('amenities.security'),
      icon: <MdOutlineSecurity size={24} />,
    },
    {
      id: 'mountain',
      label: t('amenities.mountainView'),
      icon: <PiMountainsDuotone size={24} />,
    },
    {
      id: 'massage',
      label: t('amenities.massage'),
      icon: <TbMassage size={24} />,
    },
    { id: 'bbq', label: t('amenities.bbqGrill'), icon: <TbGrill size={24} /> },
    { id: 'yoga', label: t('amenities.yoga'), icon: <GrYoga size={24} /> },
    {
      id: 'seaview',
      label: t('amenities.seaView'),
      icon: <RiRoadMapLine size={24} />,
    },
  ];

  // Handle preferred option click
  const handleOptionClick = (optionId: string) => {
    const params = new URLSearchParams();
    params.append('amenity', optionId);
    router.push(`/rent/result?${params.toString()}`);
  };

  // Handle filter applications
  const handleFilterApply = (filterData: any) => {
    if (onFilterApply) {
      onFilterApply(filterData);
    } else {
      // Direct navigation if no parent handler provided
      const params = new URLSearchParams();
      if (filterData) {
        // Add price range
        if (filterData.minPrice)
          params.append('minPrice', filterData.minPrice.toString());
        if (filterData.maxPrice)
          params.append('maxPrice', filterData.maxPrice.toString());

        // Add collections as a comma-separated list
        if (filterData.collections && filterData.collections.length > 0) {
          params.append('collections', filterData.collections.join(','));
        }

        // Add freebies as a comma-separated list
        if (filterData.freebies && filterData.freebies.length > 0) {
          params.append('freebies', filterData.freebies.join(','));
        }

        // Add amenities as a comma-separated list
        if (filterData.amenities && filterData.amenities.length > 0) {
          params.append('amenities', filterData.amenities.join(','));
        }
      }
      router.push(`/rent/result?${params.toString()}`);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <span className='text-lg md:text-[22px] text-primary font-semibold'>
          {t('title')}
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
