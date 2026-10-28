/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react';
import { FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { EnhancedDateRangePicker } from '@/components/ui/enhanced-date-range';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  SearchField,
  SearchFieldRow,
  SearchPanel,
  SearchStepper,
} from '@/components/ui/search-panel';

import { PreferredOptions } from '@/modules/rent/header/preferred-option';

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

type DurationType = 'daily' | 'monthly' | 'yearly';

const formatDate = (date: Date | undefined) =>
  date ? format(date, 'dd MMM yyyy') : '--';

/** "19 Aug 2026 — 24 Aug 2026", or the placeholder while nothing is picked. */
const formatRange = (range: DateRange, placeholder: string) => {
  if (!range.from) return placeholder;

  return `${formatDate(range.from)} — ${
    range.to ? formatDate(range.to) : placeholder
  }`;
};

const HeaderRentPage = () => {
  const t = useTranslations('rent.header');
  const router = useRouter();

  const [location, setLocation] = useState('Bali');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 4)),
  });
  const [durationType, setDurationType] = useState<DurationType>('daily');
  const [bedrooms, setBedrooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  const handleDateRangeChange = (range: DateRange, type: DurationType) => {
    setDateRange(range);
    setDurationType(type);
  };

  /** Shared query string for both the plain search and the filter dialog. */
  const baseParams = () => {
    const params = new URLSearchParams();
    params.append('location', location);
    if (dateRange.from) {
      params.append('checkIn', format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange.to) {
      params.append('checkOut', format(dateRange.to, 'yyyy-MM-dd'));
    }
    params.append('durationType', durationType);
    params.append('bedrooms', bedrooms.toString());
    params.append('guests', guests.toString());
    return params;
  };

  const handleSearch = () => {
    router.push(`/rent/result?${baseParams().toString()}`);
  };

  const handleFilterApply = (filterData: any) => {
    const params = baseParams();

    if (filterData) {
      if (filterData.minPrice)
        params.append('minPrice', filterData.minPrice.toString());
      if (filterData.maxPrice)
        params.append('maxPrice', filterData.maxPrice.toString());
      if (filterData.collections?.length) {
        params.append('collections', filterData.collections.join(','));
      }
      if (filterData.freebies?.length) {
        params.append('freebies', filterData.freebies.join(','));
      }
      if (filterData.amenities?.length) {
        params.append('amenities', filterData.amenities.join(','));
      }
    }

    router.push(`/rent/result?${params.toString()}`);
  };

  return (
    <section className='relative isolate flex min-h-[720px] flex-col justify-end overflow-hidden pb-10 pt-[72px] lg:min-h-[780px] lg:pt-[92px]'>
      <Image
        src='/images/header-buy.jpeg'
        alt=''
        fill
        priority
        aria-hidden
        sizes='100vw'
        className='-z-10 object-cover'
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/60'
      />

      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <div className='flex max-w-3xl flex-col gap-6 pt-16'>
            <h1 className='text-cream'>{t('title')}</h1>
            <p className='border-l-2 border-cream pl-5 text-base leading-relaxed text-cream/90 md:text-lg'>
              {t('subtitle')}
            </p>
          </div>

          <SearchPanel>
            <SearchFieldRow>
              {/* Location */}
              <Popover>
                <PopoverTrigger asChild>
                  <SearchField
                    icon={FaLocationDot}
                    label={t('search.location')}
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

              {/* Check in / Check out */}
              <EnhancedDateRangePicker
                onRangeChange={handleDateRangeChange}
                initialRange={dateRange}
                initialDurationType={durationType}
                namespace='rent.header.search.enhancedDateRange'
                renderTrigger={({ open }) => (
                  <SearchField
                    icon={Calendar}
                    label={t('search.dates.label')}
                    value={formatRange(
                      dateRange,
                      t('search.dates.placeholder')
                    )}
                    onClick={open}
                  />
                )}
              />

              {/* Bedrooms */}
              <Popover>
                <PopoverTrigger asChild>
                  <SearchField
                    icon={IoBed}
                    label={t('search.bedrooms')}
                    value={bedrooms.toString().padStart(2, '0')}
                  />
                </PopoverTrigger>
                <PopoverContent className='w-48 p-3'>
                  <SearchStepper
                    description={t('search.bedroomDescription')}
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
                    icon={FaUser}
                    label={t('search.guests')}
                    value={guests.toString().padStart(2, '0')}
                  />
                </PopoverTrigger>
                <PopoverContent className='w-48 p-3'>
                  <SearchStepper
                    description={t('search.guestDescription')}
                    value={guests}
                    min={1}
                    max={20}
                    onChange={setGuests}
                  />
                </PopoverContent>
              </Popover>

              <div className='flex items-center pt-3 lg:pl-6 lg:pt-0'>
                <Button
                  variant='cta'
                  className='h-14 w-full px-8 lg:w-auto lg:px-10'
                  onClick={handleSearch}
                >
                  {t('search.searchButton')}
                </Button>
              </div>
            </SearchFieldRow>

            <div className='mt-5 border-t border-bronze/30 pt-5'>
              <PreferredOptions onFilterApply={handleFilterApply} />
            </div>
          </SearchPanel>
        </div>
      </BaseContainer>
    </section>
  );
};

export default HeaderRentPage;
