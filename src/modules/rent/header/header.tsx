/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import React, { useState } from 'react';
import { FaCalendar, FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

import { PreferredOptions } from '@/modules/rent/header/preferred-option';

const HeaderRentPage = () => {
  const t = useTranslations('rent.header');
  const router = useRouter(); // Initialize router

  // Search filter states
  const [location, setLocation] = useState('Bali');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 4))
  );
  const [bedrooms, setBedrooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  // Handle search button click
  const handleSearch = () => {
    // Format dates for URL parameters
    const checkIn = checkInDate ? format(checkInDate, 'yyyy-MM-dd') : '';
    const checkOut = checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '';

    // Build query parameters
    const params = new URLSearchParams();
    params.append('location', location);
    params.append('checkIn', checkIn);
    params.append('checkOut', checkOut);
    params.append('bedrooms', bedrooms.toString());
    params.append('guests', guests.toString());

    // Navigate to results page
    router.push(`/rent/result?${params.toString()}`);
  };

  // Handle filter application
  const handleFilterApply = (filterData: any) => {
    // Format dates for URL parameters
    const checkIn = checkInDate ? format(checkInDate, 'yyyy-MM-dd') : '';
    const checkOut = checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : '';

    // Build query parameters
    const params = new URLSearchParams();
    params.append('location', location);
    params.append('checkIn', checkIn);
    params.append('checkOut', checkOut);
    params.append('bedrooms', bedrooms.toString());
    params.append('guests', guests.toString());

    // Add filter parameters
    if (filterData) {
      if (filterData.minPrice)
        params.append('minPrice', filterData.minPrice.toString());
      if (filterData.maxPrice)
        params.append('maxPrice', filterData.maxPrice.toString());

      // Add collections as a comma-separated list
      if (filterData.collections && filterData.collections.length > 0) {
        params.append('collections', filterData.collections.join(','));
      }

      // Add freebies as a comma-separated list
      if (filterData.freebies && filterData.freebies.length > 0) {
        params.append('freebies', filterData.freebies.join(','));
      }

      // Add amenities as a comma-separated list
      if (filterData.amenities && filterData.amenities.length > 0) {
        params.append('amenities', filterData.amenities.join(','));
      }
    }

    // Navigate to results page with all parameters
    router.push(`/rent/result?${params.toString()}`);
  };
  return (
    <div className='py-6 md:py-10 relative bg-bg'>
      <Image
        src='/images/header-buy.jpeg'
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-full object-cover absolute top-0 left-0  max-h-[600px] bg-[#0000004D]'
        alt='header landing page'
      />
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 justify-center relative'>
          {/* Responsive header content */}
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[867px] mb-8 lg:mb-0'>
              <h1 className='text-white h0 font-bold'>{t('title')}</h1>
              <div className='px-3 md:px-5 border-white border-solid border-l-2 text-white text-lg md:text-[22px]'>
                {t('subtitle')}
              </div>
            </div>
          </div>

          {/* Search Box */}
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

              {/* Check in */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <FaCalendar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.checkIn')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>
                          {checkInDate
                            ? format(checkInDate, 'dd MMM yyyy')
                            : t('search.selectDate')}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={checkInDate}
                    onSelect={setCheckInDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Check out */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <FaCalendar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.checkOut')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>
                          {checkOutDate
                            ? format(checkOutDate, 'dd MMM yyyy')
                            : t('search.selectDate')}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    initialFocus
                  />
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
                      <span>Number of bedrooms</span>
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

              {/* Guests */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <FaUser size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.guests')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>
                          {guests.toString().padStart(2, '0')}
                        </span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-3'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex justify-between items-center'>
                      <span>Number of guests</span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
                        disabled={guests <= 1}
                      >
                        -
                      </button>
                      <span className='font-semibold'>
                        {guests.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => setGuests(Math.min(20, guests + 1))}
                        className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
                        disabled={guests >= 20}
                      >
                        +
                      </button>
                    </div>
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
                {t('search.searchButton')}
              </Button>
            </div>

            <Separator />

            {/* Using the updated PreferredOptions component */}
            <PreferredOptions onFilterApply={handleFilterApply} />
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

export default HeaderRentPage;
