'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaLocationDot, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import { Button } from '@/components/ui/button';
import { EnhancedDateRangePicker } from '@/components/ui/enhanced-date-range';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface StaySearchProps {
  onSearch: (searchParams: Record<string, string>) => void;
}

// Add these type definitions at the top of your file
type DateRange = {
  from: Date | undefined;
  to?: Date | undefined; // Note the optional to property
};

type DurationType = 'daily' | 'monthly' | 'yearly';

const StaySearch: React.FC<StaySearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('Bali');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 4)),
  });
  const [durationType, setDurationType] = useState<
    'daily' | 'monthly' | 'yearly'
  >('daily');
  const [bedrooms, setBedrooms] = useState(1);
  const [guests, setGuests] = useState(1);

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

  const handleDateRangeChange = (
    range: DateRange, // External DateRange with optional 'to'
    type: DurationType
  ) => {
    // Create a properly typed object for state
    setDateRange({
      from: range.from,
      to: range.to || undefined,
    });
    setDurationType(type);
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
                <span className='font-semibold text-left'>Location</span>
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

        {/* Enhanced Date Range Picker - replaces separate check-in/check-out */}
        <EnhancedDateRangePicker
          onRangeChange={handleDateRangeChange}
          initialRange={dateRange}
          initialDurationType={durationType}
        />

        {/* Bedrooms */}
        <Popover>
          <PopoverTrigger asChild>
            <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
              <IoBed size={24} className='text-primary' />
              <div className='flex flex-col w-full'>
                <span className='font-semibold text-left'>Bedrooms</span>
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
                <span className='font-semibold text-left'>Guests</span>
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
          Search
        </Button>
      </div>

      {/* Promotions */}
      <div className='flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 text-sm md:text-base bg-bg rounded-md px-5 py-3 border border-primary'>
        <p className='font-semibold text-primary'>
          *Exclusive Early Bird Offers – Book Early & Enjoy Special Discounts!🌟
        </p>
        <Link
          href='/rent'
          className='font-semibold text-primary underline whitespace-nowrap'
        >
          Click here to view the list!
        </Link>
      </div>
    </>
  );
};

export default StaySearch;
