/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';
import { IoBed } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TbCurrencyDollar } from 'react-icons/tb';
import { useTranslations } from 'use-intl';

import { useRouter } from '@/lib/navigation';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  DEFAULT_PRICE_RANGES,
  formatPrice,
  PriceRangeSelector,
} from '@/components/ui/price-range-selector';
import {
  SearchField,
  SearchFieldRow,
  SearchPanel,
  SearchStepper,
} from '@/components/ui/search-panel';

import { PreferredOptionsBuyPage } from '@/modules/buy/header/preferred-option';

const HeaderBuyPage = () => {
  const t = useTranslations('buy.header');
  const router = useRouter();

  // Search filter states
  const [location, setLocation] = useState('Bali');
  const [ownership, setOwnership] = useState('Leasehold');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  // Updated price range state to use min and max values instead of a string
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  // Ownership types with translations
  const ownershipTypes = [
    { value: 'Leasehold', label: t('search.ownershipTypes.leasehold') },
    { value: 'Freehold', label: t('search.ownershipTypes.freehold') },
    { value: 'Both', label: t('search.ownershipTypes.both') },
  ];

  // Format the price range for display
  const getDisplayPriceRange = (): string => {
    if (minPrice === 0 && maxPrice === null) {
      return t('search.anyPrice');
    }

    if (maxPrice === null) {
      return `${formatPrice(minPrice)}+`;
    }

    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  // Handle price range change from the selector component
  const handlePriceChange = (min: number, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  // Handle search button click - Navigate to results page with query params
  const handleSearch = () => {
    // Convert the search parameters to query string
    const params = new URLSearchParams();
    params.append('location', location);
    params.append('ownership', ownership);
    params.append('bedrooms', bedrooms.toString());
    params.append('bathrooms', bathrooms.toString());

    // Add min and max price to query params
    params.append('minPrice', minPrice.toString());
    params.append('maxPrice', maxPrice?.toString() || 'any');

    // Navigate to results page with search parameters
    router.push(`/buy/result?${params.toString()}`);
  };

  // Handle filter application
  const handleFilterApply = (filterData: any) => {
    // Combine current search parameters with filter data
    const params = new URLSearchParams();
    params.append('location', location);
    params.append('ownership', ownership);
    params.append('bedrooms', bedrooms.toString());
    params.append('bathrooms', bathrooms.toString());
    params.append('minPrice', minPrice.toString());
    params.append('maxPrice', maxPrice?.toString() || 'any');

    // Add filter parameters if available
    if (filterData) {
      Object.entries(filterData).forEach(([key, value]) => {
        if (value) {
          params.append(key, value.toString());
        }
      });
    }

    router.push(`/buy/result?${params.toString()}`);
  };

  return (
    <section className='relative isolate flex min-h-[560px] flex-col justify-end overflow-hidden pb-10 pt-[72px] lg:min-h-[600px] lg:pt-[92px]'>
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
        <div className='flex flex-col gap-6'>
          <div className='flex max-w-3xl flex-col gap-5 pt-6'>
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

              {/* Ownership */}
              <Popover>
                <PopoverTrigger asChild>
                  <SearchField
                    icon={GrCertificate}
                    label={t('search.ownership')}
                    value={
                      ownershipTypes.find((type) => type.value === ownership)
                        ?.label ?? ownership
                    }
                  />
                </PopoverTrigger>
                <PopoverContent className='w-56 p-2'>
                  <div className='flex flex-col'>
                    {ownershipTypes.map((type) => (
                      <button
                        key={type.value}
                        type='button'
                        className={`rounded px-3 py-2 text-left transition-colors ${
                          ownership === type.value
                            ? 'bg-bronze/15 text-bronze-600'
                            : 'hover:bg-bronze/10'
                        }`}
                        onClick={() => setOwnership(type.value)}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

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
                    description={t('search.numberOfBedrooms')}
                    value={bedrooms}
                    min={1}
                    max={10}
                    onChange={setBedrooms}
                  />
                </PopoverContent>
              </Popover>

              {/* Bathrooms */}
              <Popover>
                <PopoverTrigger asChild>
                  <SearchField
                    icon={LuBath}
                    label={t('search.bathrooms')}
                    value={bathrooms.toString().padStart(2, '0')}
                  />
                </PopoverTrigger>
                <PopoverContent className='w-48 p-3'>
                  <SearchStepper
                    description={t('search.numberOfBathrooms')}
                    value={bathrooms}
                    min={1}
                    max={10}
                    onChange={setBathrooms}
                  />
                </PopoverContent>
              </Popover>

              {/* Price range */}
              <Popover>
                <PopoverTrigger asChild>
                  <SearchField
                    icon={TbCurrencyDollar}
                    label={t('search.priceRange')}
                    value={getDisplayPriceRange()}
                  />
                </PopoverTrigger>
                <PopoverContent className='w-auto max-w-[350px] p-0'>
                  <PriceRangeSelector
                    initialMinPrice={minPrice}
                    initialMaxPrice={maxPrice}
                    priceRanges={DEFAULT_PRICE_RANGES}
                    onChange={handlePriceChange}
                    className='p-4'
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
              <PreferredOptionsBuyPage onFilterApply={handleFilterApply} />
            </div>
          </SearchPanel>
        </div>
      </BaseContainer>
    </section>
  );
};

export default HeaderBuyPage;
