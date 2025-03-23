/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
import { Separator } from '@/components/ui/separator';

import { PreferredOptionsBuyPage } from '@/modules/buy/header/preferred-option';

const HeaderBuyPage = () => {
  const router = useRouter();

  // Search filter states
  const [location, setLocation] = useState('Bali');
  const [ownership, setOwnership] = useState('Leasehold');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [priceRange, setPriceRange] = useState('Any Price');

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];
  const ownershipTypes = ['Leasehold', 'Freehold', 'Both'];

  // Handle search button click - Navigate to results page with query params
  const handleSearch = () => {
    // Convert the search parameters to query string
    const params = new URLSearchParams();
    params.append('location', location);
    params.append('ownership', ownership);
    params.append('bedrooms', bedrooms.toString());
    params.append('bathrooms', bathrooms.toString());
    params.append('priceRange', priceRange);

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
    params.append('priceRange', priceRange);

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
    <div className='py-6 md:pb-10 md:pt-[68px] relative bg-bg'>
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
              <h1 className='text-white h0 font-bold'>
                Own Your Dream Villa <br />
                with LIND Society
              </h1>
              <div className='px-3 md:px-5 border-white border-solid border-l-2 text-white text-lg md:text-[22px]'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Reprehenderit, numquam?
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

              {/* Ownership - Added icon */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <GrCertificate size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>Ownership</span>
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

              {/* Bathrooms - Added proper bathrooms icon */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <LuBath size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>Bathrooms</span>
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
                      <span>Number of bathrooms</span>
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

              {/* Price - Added price icon */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <TbCurrencyDollar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>Price</span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>{priceRange}</span>
                        <ChevronDown size={18} className='text-primary' />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className='w-80 p-3'>
                  <div className='flex flex-col gap-4'>
                    <h5 className='font-semibold'>Price Range</h5>

                    {/* We would integrate the PriceRangeSlider component here */}
                    <div className='grid grid-cols-1 gap-3'>
                      {[
                        'Any Price',
                        'Under $500,000',
                        '$500,000 - $1M',
                        '$1M - $2M',
                        '$2M - $5M',
                        '$5M+',
                      ].map((range) => (
                        <button
                          key={range}
                          className={`py-2 px-3 text-left rounded-md ${
                            priceRange === range
                              ? 'bg-primary/10 text-primary'
                              : 'hover:bg-gray-100'
                          }`}
                          onClick={() => setPriceRange(range)}
                        >
                          {range}
                        </button>
                      ))}
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

            <Separator />

            {/* Using the updated PreferredOptions component */}
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
