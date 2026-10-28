'use client';

import { format } from 'date-fns';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaCalendar, FaLocationDot } from 'react-icons/fa6';
import { TbCurrencyDollar } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  PromoStrip,
  SearchField,
  SearchFieldRow,
} from '@/components/ui/search-panel';

import { formatCurrency } from '@/modules/rent/header/price-range';
import { activityLocations } from '@/modules/tourist-activity/constant';

interface TouristSearchProps {
  onSearch: (searchParams: Record<string, string>) => void;
}

const TouristSearch: React.FC<TouristSearchProps> = ({ onSearch }) => {
  const t = useTranslations('landingPage.search');

  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);

  const handleSearch = () => {
    onSearch({
      location: selectedLocation,
      searchTerm,
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
    });
  };

  return (
    <>
      <SearchFieldRow>
        {/* Location */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={FaLocationDot}
              label={t('location.label')}
              value={selectedLocation || t('chooseLocation')}
            />
          </PopoverTrigger>
          <PopoverContent className='max-h-72 w-56 overflow-y-auto p-2'>
            <div className='flex flex-col'>
              {activityLocations.map((location) => (
                <button
                  key={location}
                  type='button'
                  className={`rounded px-3 py-2 text-left transition-colors ${
                    selectedLocation === location
                      ? 'bg-bronze/15 text-bronze-600'
                      : 'hover:bg-bronze/10'
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Free-text activity search */}
        <div className='flex flex-1 flex-col gap-1 px-1 py-3 lg:px-6 lg:py-2'>
          <span className='flex items-center gap-2 text-sm text-bronze-300'>
            <Search size={16} className='shrink-0 text-bronze' />
            {t('whatToDo')}
          </span>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('whatToDo')}
            className='w-full border-none bg-transparent p-0 text-base text-cream placeholder:text-cream/45 focus:outline-none focus:ring-0'
          />
        </div>

        {/* Date availability */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={FaCalendar}
              label={t('availability')}
              value={selectedDate ? format(selectedDate, 'dd MMM yyyy') : '—'}
            />
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Price range */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={TbCurrencyDollar}
              label={t('priceRange.label')}
              value={
                minPrice === 0 && maxPrice === 5000000
                  ? t('priceRange.anyPrice')
                  : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
              }
            />
          </PopoverTrigger>
          <PopoverContent className='w-80 p-4'>
            <div className='flex flex-col gap-4'>
              <span className='font-heading text-lg font-semibold'>
                {t('priceRange.label')}
              </span>
              <div className='flex justify-between gap-3'>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm text-ink-muted'>
                    {t('priceRange.minPrice')}
                  </span>
                  <input
                    type='number'
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className='w-32 rounded border border-bronze/30 bg-transparent p-2'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm text-ink-muted'>
                    {t('priceRange.maxPrice')}
                  </span>
                  <input
                    type='number'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className='w-32 rounded border border-bronze/30 bg-transparent p-2'
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className='flex items-center pt-3 lg:pl-6 lg:pt-0'>
          <Button
            variant='cta'
            className='h-14 w-full px-8 lg:w-auto lg:px-10'
            onClick={handleSearch}
          >
            {t('searchButton')}
          </Button>
        </div>
      </SearchFieldRow>

      <PromoStrip
        className='mt-4'
        message={t('promotions.tourist')}
        linkLabel={t('promotions.touristLink')}
        href='/early-bird'
      />
    </>
  );
};

export default TouristSearch;
