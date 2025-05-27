'use client';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';
import { TbCurrencyDollar } from 'react-icons/tb';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { formatCurrency } from '@/modules/rent/header/price-range';
import { activityLocations } from '@/modules/tourist-activity/constant';

interface TouristSearchProps {
  onSearch: (searchParams: Record<string, string>) => void;
}

const TouristSearch: React.FC<TouristSearchProps> = ({ onSearch }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);

  const handleSearch = () => {
    onSearch({
      location: selectedLocation,
      searchTerm,
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
    });
  };

  return (
    <>
      {/* Search inputs */}
      <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4 md:gap-6'>
        {/* Location */}
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className='w-full md:w-[240px] h-[46px] border border-transparent hover:border-gray-200'>
            <SelectValue placeholder='Choose Location' />
          </SelectTrigger>
          <SelectContent>
            {activityLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search term */}
        <div className='flex border rounded-md w-full md:w-auto border-transparent hover:border-gray-200'>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='What do you want to do?'
            className='border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none py-3 px-4 w-full md:w-[240px]'
          />
        </div>

        {/* Date availability */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='flex gap-2 items-center w-full md:w-auto'
            >
              <FaCalendar className='text-primary text-xl' />
              <span className='text-primary'>
                {selectedDate
                  ? format(selectedDate, 'dd MMM yyyy')
                  : 'Availability'}
              </span>
              <ChevronDown className='text-primary' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Price range */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className='flex gap-2 items-center w-full md:w-auto'
            >
              <TbCurrencyDollar className='text-primary text-xl' />
              <span className='text-primary'>
                {minPrice === 0 && maxPrice === 5000000
                  ? 'Price Range'
                  : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}
              </span>
              <ChevronDown className='text-primary' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-80 p-4'>
            <div className='flex flex-col gap-4'>
              <span className='font-medium'>Price Range</span>
              <div className='flex justify-between'>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm text-gray-500'>Min Price</span>
                  <input
                    type='number'
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className='w-32 border rounded-md p-2'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <span className='text-sm text-gray-500'>Max Price</span>
                  <input
                    type='number'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className='w-32 border rounded-md p-2'
                  />
                </div>
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
          *Special Group Discounts - Book Activities for 4+ People and Save
          15%!🌴
        </p>
        <Link
          href='/tourist-activity'
          className='font-semibold text-primary underline whitespace-nowrap'
        >
          Explore top-rated activities!
        </Link>
      </div>
    </>
  );
};

export default TouristSearch;
