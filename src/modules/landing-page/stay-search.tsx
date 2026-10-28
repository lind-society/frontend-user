'use client';

import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { IoBed, IoPeopleOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { EnhancedDateRangePicker } from '@/components/ui/enhanced-date-range';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  PromoStrip,
  SearchField,
  SearchFieldRow,
  SearchStepper,
} from '@/components/ui/search-panel';

interface StaySearchProps {
  onSearch: (searchParams: Record<string, string>) => void;
}

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

type DurationType = 'daily' | 'monthly' | 'yearly';

const formatDate = (date: Date | undefined) =>
  date
    ? date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—';

/** "19 Aug 2026 — 24 Aug 2026", or the placeholder while nothing is picked. */
const formatRange = (range: DateRange, placeholder: string) => {
  if (!range.from) return placeholder;

  return `${formatDate(range.from)} — ${
    range.to ? formatDate(range.to) : placeholder
  }`;
};

const StaySearch: React.FC<StaySearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('Bali');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 4)),
  });
  const [durationType, setDurationType] = useState<DurationType>('daily');
  const [bedrooms, setBedrooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const t = useTranslations('landingPage.search');

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  const handleSearch = () => {
    onSearch({
      location,
      checkIn: dateRange.from ? dateRange.from.toISOString() : '',
      checkOut: dateRange.to ? dateRange.to.toISOString() : '',
      durationType,
      bedrooms: bedrooms.toString(),
      guests: guests.toString(),
    });
  };

  const handleDateRangeChange = (range: DateRange, type: DurationType) => {
    setDateRange({ from: range.from, to: range.to || undefined });
    setDurationType(type);
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
              value={location}
            />
          </PopoverTrigger>
          <PopoverContent className='w-56 p-2'>
            <div className='flex flex-col'>
              {locations.map((loc) => (
                <button
                  key={loc}
                  type='button'
                  className={`rounded px-3 py-2 text-left transition-colors ${
                    location === loc
                      ? 'bg-bronze/15 text-bronze-600'
                      : 'hover:bg-bronze/10'
                  }`}
                  onClick={() => setLocation(loc)}
                >
                  {loc}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Stay dates — one field for the whole range, edited in one panel */}
        <EnhancedDateRangePicker
          onRangeChange={handleDateRangeChange}
          initialRange={dateRange}
          initialDurationType={durationType}
          renderTrigger={({ open }) => (
            <SearchField
              icon={Calendar}
              label={t('dates.label')}
              value={formatRange(dateRange, t('dates.placeholder'))}
              onClick={open}
            />
          )}
        />

        {/* Bedrooms */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={IoBed}
              label={t('bedrooms.label')}
              value={bedrooms.toString().padStart(2, '0')}
            />
          </PopoverTrigger>
          <PopoverContent className='w-48 p-3'>
            <SearchStepper
              description={t('bedrooms.description')}
              value={bedrooms}
              min={1}
              max={10}
              onChange={setBedrooms}
            />
          </PopoverContent>
        </Popover>

        {/* Guests */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={IoPeopleOutline}
              label={t('guests.label')}
              value={guests.toString().padStart(2, '0')}
            />
          </PopoverTrigger>
          <PopoverContent className='w-48 p-3'>
            <SearchStepper
              description={t('guests.description')}
              value={guests}
              min={1}
              max={20}
              onChange={setGuests}
            />
          </PopoverContent>
        </Popover>

        <div className='flex items-center pt-3 lg:pl-6 lg:pt-0'>
          <Button
            onClick={handleSearch}
            variant='cta'
            className='h-14 w-full px-8 lg:w-auto lg:px-10'
          >
            {t('searchButton')}
          </Button>
        </div>
      </SearchFieldRow>

      <PromoStrip
        className='mt-4'
        message={t('promotions.stay')}
        linkLabel={t('promotions.stayLink')}
        href='/early-bird'
      />
    </>
  );
};

export default StaySearch;
