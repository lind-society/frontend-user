'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';
import { IoBed } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TbCurrencyDollar } from 'react-icons/tb';

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
  PromoStrip,
  SearchField,
  SearchFieldRow,
  SearchStepper,
} from '@/components/ui/search-panel';

interface BuySearchProps {
  onSearch: (searchParams: Record<string, string>) => void;
}

const BuySearch: React.FC<BuySearchProps> = ({ onSearch }) => {
  const t = useTranslations('landingPage.search');

  const [location, setLocation] = useState('Bali');
  const [ownership, setOwnership] = useState('Leasehold');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];
  const ownershipTypes = ['Leasehold', 'Freehold', 'Both'];

  const getDisplayPriceRange = (): string => {
    if (minPrice === 0 && maxPrice === null) {
      return t('priceRange.anyPrice');
    }
    if (maxPrice === null) {
      return `${formatPrice(minPrice)}+`;
    }
    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const handlePriceChange = (min: number, max: number | null) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearch = () => {
    onSearch({
      location,
      ownership,
      bedrooms: bedrooms.toString(),
      bathrooms: bathrooms.toString(),
      minPrice: minPrice.toString(),
      maxPrice: maxPrice?.toString() || 'any',
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
              label={t('ownership.label')}
              value={ownership}
            />
          </PopoverTrigger>
          <PopoverContent className='w-56 p-2'>
            <div className='flex flex-col'>
              {ownershipTypes.map((type) => (
                <button
                  key={type}
                  type='button'
                  className={`rounded px-3 py-2 text-left transition-colors ${
                    ownership === type
                      ? 'bg-bronze/15 text-bronze-600'
                      : 'hover:bg-bronze/10'
                  }`}
                  onClick={() => setOwnership(type)}
                >
                  {type}
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

        {/* Bathrooms */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={LuBath}
              label={t('bathrooms.label')}
              value={bathrooms.toString().padStart(2, '0')}
            />
          </PopoverTrigger>
          <PopoverContent className='w-48 p-3'>
            <SearchStepper
              description={t('bathrooms.description')}
              value={bathrooms}
              min={1}
              max={10}
              onChange={setBathrooms}
            />
          </PopoverContent>
        </Popover>

        {/* Price Range */}
        <Popover>
          <PopoverTrigger asChild>
            <SearchField
              icon={TbCurrencyDollar}
              label={t('priceRange.label')}
              value={getDisplayPriceRange()}
            />
          </PopoverTrigger>
          <PopoverContent className='w-80 p-4'>
            <div className='flex flex-col gap-4'>
              <span className='font-heading text-lg font-semibold'>
                {t('priceRange.label')}
              </span>
              <PriceRangeSelector
                initialMinPrice={minPrice}
                initialMaxPrice={maxPrice}
                absoluteMin={0}
                absoluteMax={10000000}
                step={10000}
                onChange={handlePriceChange}
                priceRanges={DEFAULT_PRICE_RANGES}
              />
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
        message={t('promotions.buy')}
        linkLabel={t('promotions.buyLink')}
        href='/early-bird'
      />
    </>
  );
};

export default BuySearch;
