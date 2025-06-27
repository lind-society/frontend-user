'use client';

import { ChevronDown, Slash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { GrCertificate } from 'react-icons/gr';
import { IoBed } from 'react-icons/io5';
import { LuBath } from 'react-icons/lu';
import { TbCurrencyDollar } from 'react-icons/tb';

import BaseContainer from '@/components/layouts/container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { PreferredOptions } from '@/modules/buy-result/preferred-option';
import { PriceRange } from '@/modules/buy-result/price-range';

const HeaderBuyResult = () => {
  const t = useTranslations('buyResult');

  // Location state
  const [location, setLocation] = useState('Bali');
  const [ownership, setOwnership] = useState('Leasehold');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]);

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];
  const ownershipTypes = ['Leasehold', 'Freehold', 'Both'];

  // Handle search button click
  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log('Search with parameters:', {
      location,
      ownership,
      bedrooms,
      bathrooms,
      priceRange,
    });
    // Actual search implementation would go here
  };

  return (
    <div>
      {/* Breadcrumb section */}
      <div className='border-y py-4 md:py-6'>
        <BaseContainer>
          <div className='rounded-md bg-white border px-3 py-1'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>
                    {t('breadcrumb.home')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem className='font-semibold'>
                  <BreadcrumbLink href='/buy/result'>
                    {t('breadcrumb.searchResults')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </BaseContainer>
      </div>

      {/* Search form section */}
      <div className='border-b py-6'>
        <BaseContainer>
          <div className='bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col gap-3 md:gap-5 shadow-md'>
            {/* Search inputs */}
            <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4 md:gap-6'>
              {/* Location */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <FaLocationDot size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.location')}
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
                        {t('search.ownership')}
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
                        {t('search.bedrooms')}
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
                      <span>{t('search.bedroomDescription')}</span>
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
                        {t('search.bathrooms')}
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
                      <span>{t('search.bathroomDescription')}</span>
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
                        onClick={() =>
                          setBathrooms(Math.min(10, bathrooms + 1))
                        }
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
                        {t('search.priceRange')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>
                          ${priceRange[0].toLocaleString()} - $
                          {priceRange[1].toLocaleString()}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-80 p-4'>
                  <PriceRange
                    values={priceRange}
                    onValueChange={setPriceRange}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Search Button */}
            <div className='flex justify-center md:justify-end'>
              <Button
                onClick={handleSearch}
                className='w-full md:w-auto px-8 py-2 bg-primary hover:bg-primary/90'
              >
                {t('search.search')}
              </Button>
            </div>
          </div>
        </BaseContainer>
      </div>

      {/* Preferred Options */}
      <PreferredOptions />
    </div>
  );
};

export default HeaderBuyResult;
