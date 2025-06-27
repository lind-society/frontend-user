'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
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

  // Format the price range for display
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
      {/* Search inputs */}
      <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4 md:gap-6'>
        {/* Location */}
        <Popover>
          <PopoverTrigger asChild>
            <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
              <FaLocationDot size={24} className='text-primary' />
              <div className='flex flex-col w-full'>
                <span className='font-semibold text-left'>
                  {t('location.label')}
                </span>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>{location}</span>
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
                  className={`py-2 px-3 text-left rounded-md ${
                    location === loc
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100'
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
            <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
              <GrCertificate size={24} className='text-primary' />
              <div className='flex flex-col w-full'>
                <span className='font-semibold text-left'>
                  {t('ownership.label')}
                </span>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>{ownership}</span>
                  <ChevronDown size={18} className='text-primary' />
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-56 p-2'>
            <div className='flex flex-col'>
              {ownershipTypes.map((type) => (
                <button
                  key={type}
                  className={`py-2 px-3 text-left rounded-md ${
                    ownership === type
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-gray-100'
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
            <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
              <IoBed size={24} className='text-primary' />
              <div className='flex flex-col w-full'>
                <span className='font-semibold text-left'>
                  {t('bedrooms.label')}
                </span>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>
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
                <span>{t('bedrooms.description')}</span>
              </div>
              <div className='flex items-center justify-between'>
                <button
                  onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                  className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
                  disabled={bedrooms <= 1}
                >
                  -
                </button>
                <span className='font-semibold'>
                  {bedrooms.toString().padStart(2, '0')}
                </span>
                <button
                  onClick={() => setBedrooms(Math.min(10, bedrooms + 1))}
                  className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
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
            <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
              <LuBath size={24} className='text-primary' />
              <div className='flex flex-col w-full'>
                <span className='font-semibold text-left'>
                  {t('bathrooms.label')}
                </span>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>
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
                <span>{t('bathrooms.description')}</span>
              </div>
              <div className='flex items-center justify-between'>
                <button
                  onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                  className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
                  disabled={bathrooms <= 1}
                >
                  -
                </button>
                <span className='font-semibold'>
                  {bathrooms.toString().padStart(2, '0')}
                </span>
                <button
                  onClick={() => setBathrooms(Math.min(10, bathrooms + 1))}
                  className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
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
            <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
              <TbCurrencyDollar size={24} className='text-primary' />
              <div className='flex flex-col w-full'>
                <span className='font-semibold text-left'>
                  {t('priceRange.label')}
                </span>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-500'>
                    {getDisplayPriceRange()}
                  </span>
                  <ChevronDown size={18} className='text-primary' />
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-80 p-4'>
            <div className='flex flex-col gap-4'>
              <span className='text-lg font-semibold'>
                {t('priceRange.label')}
              </span>
              <PriceRangeSelector
                initialMinPrice={minPrice}
                initialMaxPrice={maxPrice}
                absoluteMin={0}
                absoluteMax={10000000} // 10M
                step={10000}
                onChange={handlePriceChange}
                priceRanges={DEFAULT_PRICE_RANGES}
              />
            </div>
          </PopoverContent>
        </Popover>

        {/* Search Button */}
        <Button
          variant='primary'
          size='lg'
          className='w-full md:w-auto'
          onClick={handleSearch}
        >
          {t('searchButton')}
        </Button>
      </div>

      {/* Promotions */}
      <div className='flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 text-sm md:text-base bg-bg rounded-md px-5 py-3 border border-primary'>
        <p className='font-semibold text-primary'>{t('promotions.buy')}</p>
        <Link
          href='/buy'
          className='font-semibold text-primary underline whitespace-nowrap'
        >
          {t('promotions.buyLink')}
        </Link>
      </div>
    </>
  );
};

export default BuySearch;
