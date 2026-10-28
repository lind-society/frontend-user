/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';
import { IoBed } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TbCurrencyDollar } from 'react-icons/tb';

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
import { Separator } from '@/components/ui/separator';

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
    <div className='py-6 md:pb-10 md:pt-[68px] relative'>
      <Image
        src='/images/header-buy.jpeg'
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-full object-cover absolute top-0 left-0 max-h-[450px] bg-[#0000004D]'
        alt='header landing page'
      />
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-[64px] justify-center relative'>
          {/* Responsive header content */}
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[867px] mb-8 lg:mb-0'>
              <h1 className='text-cream h0 font-bold'>{t('title')}</h1>
              <div className='px-3 md:px-5 border-white border-solid border-l-2 text-cream text-lg md:text-[22px]'>
                {t('subtitle')}
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className='bg-cream-light rounded px-4 md:px-8 py-4 md:py-6 flex flex-col gap-3 md:gap-5 shadow-sm'>
            {/* Search inputs */}
            <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4 md:gap-6'>
              {/* Location */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <FaLocationDot size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.location')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>{location}</span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-56 p-2'>
                  <div className='flex flex-col'>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        className={`py-2 px-3 text-left rounded ${
                          location === loc
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-sand/40'
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
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <GrCertificate size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.ownership')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>
                          {ownershipTypes.find(
                            (type) => type.value === ownership
                          )?.label || ownership}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-56 p-2'>
                  <div className='flex flex-col'>
                    {ownershipTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`py-2 px-3 text-left rounded ${
                          ownership === type.value
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-sand/40'
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
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <IoBed size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.bedrooms')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>
                          {bedrooms.toString().padStart(2, '0')}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-3'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-between items-center'>
                      <span>{t('search.numberOfBedrooms')}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                        className='w-8 h-8 flex items-center justify-center bg-sand/40 rounded-full'
                        disabled={bedrooms <= 1}
                      >
                        -
                      </button>
                      <span className='font-semibold'>
                        {bedrooms.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => setBedrooms(Math.min(10, bedrooms + 1))}
                        className='w-8 h-8 flex items-center justify-center bg-sand/40 rounded-full'
                        disabled={bedrooms >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Bathrooms */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <LuBath size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.bathrooms')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>
                          {bathrooms.toString().padStart(2, '0')}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-3'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-between items-center'>
                      <span>{t('search.numberOfBathrooms')}</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                        className='w-8 h-8 flex items-center justify-center bg-sand/40 rounded-full'
                        disabled={bathrooms <= 1}
                      >
                        -
                      </button>
                      <span className='font-semibold'>
                        {bathrooms.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() =>
                          setBathrooms(Math.min(10, bathrooms + 1))
                        }
                        className='w-8 h-8 flex items-center justify-center bg-sand/40 rounded-full'
                        disabled={bathrooms >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Price Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <TbCurrencyDollar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.priceRange')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted truncate max-w-[150px]'>
                          {getDisplayPriceRange()}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
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

              {/* Search Button */}
              <Button
                variant='primary'
                size='lg'
                className='w-full md:w-auto'
                onClick={handleSearch}
              >
                {t('search.searchButton')}
              </Button>
            </div>

            <Separator />

            {/* Preferred Options */}
            <PreferredOptionsBuyPage onFilterApply={handleFilterApply} />
          </div>
        </div>
      </BaseContainer>

      {/* Responsive CSS for hiding scrollbar */}
      <style jsx global>{`
        .hideScrollbar::-webkit-scrollbar {
          display: none;
        }
        .hideScrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HeaderBuyPage;
