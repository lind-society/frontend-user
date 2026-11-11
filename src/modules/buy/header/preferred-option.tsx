/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { FaHome, FaSearchDollar } from 'react-icons/fa';
import { GiIsland, GiPalmTree } from 'react-icons/gi';
import { IoWater } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { useTranslations } from 'use-intl';

import { useRouter } from '@/lib/navigation';

import { AmenityChip } from '@/components/ui/amenity-chip';

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
  const t = useTranslations('buy.preferredOptions');
  const router = useRouter();

  // Adding the preferred options with translations
  const preferredOptions: PreferredOption[] = [
    {
      id: 'instant-income',
      label: t('options.instantIncome'),
      icon: <FaSearchDollar size={20} />,
    },
    {
      id: 'rental-ready',
      label: t('options.rentalReady'),
      icon: <FaHome size={20} />,
    },
    {
      id: 'ocean-view',
      label: t('options.oceanView'),
      icon: <IoWater size={20} />,
    },
    {
      id: 'high-end-luxury',
      label: t('options.highEndLuxury'),
      icon: <MdOutlineVilla size={20} />,
    },
    {
      id: 'jungle-view',
      label: t('options.jungleView'),
      icon: <GiPalmTree size={20} />,
    },
    {
      id: 'land-plots',
      label: t('options.landPlots'),
      icon: <GiIsland size={20} />,
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
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between gap-4'>
        <span className='font-heading text-xl font-semibold text-bronze'>
          {t('title')}
        </span>
        <FiltersDialog onApply={handleFilterApply} />
      </div>

      <OptionCarousel>
        {preferredOptions.map((option) => (
          <AmenityChip
            key={option.id}
            icon={option.icon}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.label}
          </AmenityChip>
        ))}
      </OptionCarousel>
    </div>
  );
}
