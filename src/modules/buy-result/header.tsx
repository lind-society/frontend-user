'use client';

import { ChevronDown, Slash } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
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

/** UI label -> API `ownershipType` enum value (or omitted for "Both"). */
const OWNERSHIP_TO_FILTER: Record<string, string | undefined> = {
  Leasehold: 'leasehold',
  Freehold: 'freehold',
  Both: undefined,
};
const FILTER_TO_OWNERSHIP: Record<string, string> = {
  leasehold: 'Leasehold',
  freehold: 'Freehold',
};

const HeaderBuyResult = () => {
  const t = useTranslations('buyResult');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(
    () => searchParams.get('location') ?? 'Bali'
  );
  const [ownership, setOwnership] = useState(
    () => FILTER_TO_OWNERSHIP[searchParams.get('ownership') ?? ''] ?? 'Both'
  );
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 20000000000,
  ]);

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];
  const ownershipTypes = ['Leasehold', 'Freehold', 'Both'];

  // Pushes the current filter state into the URL — buy-result/result.tsx (a
  // sibling component) reads it from there to actually query the API.
  // Bedrooms/bathrooms aren't sent: properties have no such filterable
  // column on the backend (they're derived client-side from `additionals`).
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('location', location);
    const ownershipFilter = OWNERSHIP_TO_FILTER[ownership];
    if (ownershipFilter) {
      params.set('ownership', ownershipFilter);
    } else {
      params.delete('ownership');
    }
    params.set('minPrice', String(priceRange[0]));
    params.set('maxPrice', String(priceRange[1]));

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {/* Breadcrumb section */}
      <div className='border-y py-4 md:py-6'>
        <BaseContainer>
          <div className='rounded bg-cream-light border px-3 py-1'>
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
                        <span className='text-ink-muted'>{ownership}</span>
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
                        className={`py-2 px-3 text-left rounded ${
                          ownership === type
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-sand/40'
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
                      <span>{t('search.bedroomDescription')}</span>
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
                      <span>{t('search.bathroomDescription')}</span>
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
                        <span className='text-ink-muted'>
                          Rp{priceRange[0].toLocaleString('id-ID')} - Rp
                          {priceRange[1].toLocaleString('id-ID')}
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
              <div className='flex justify-center md:justify-end'>
                <Button
                  onClick={handleSearch}
                  className='w-full md:w-auto px-8 py-2 bg-primary hover:bg-primary/90'
                >
                  {t('search.search')}
                </Button>
              </div>
            </div>

            {/* Search Button */}
          </div>
        </BaseContainer>
      </div>

      <div className='border-b py-6 md:py-8'>
        <BaseContainer>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8'>
            {/* Preferred options section */}
            <PreferredOptions />

            {/* Price range section */}
            <PriceRange values={priceRange} onValueChange={setPriceRange} />
          </div>
        </BaseContainer>
      </div>
    </div>
  );
};

export default HeaderBuyResult;
