'use client';

import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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

type TabType = 'stay' | 'buy' | 'tourist';

const HeaderLandingPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('stay');
  const [location, setLocation] = useState('Bali');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 4))
  );
  const [bedrooms, setBedrooms] = useState(1);
  const [guests, setGuests] = useState(1);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  return (
    <div className='py-6 md:py-10 relative'>
      <Image
        src='/images/header-landing-page.png'
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-full object-cover absolute top-0 left-0 -z-10'
        alt='header landing page'
      />
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 justify-center'>
          {/* Responsive header content */}
          <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center'>
            <div className='flex flex-col gap-4 md:gap-6 max-w-full lg:max-w-[567px] mb-8 lg:mb-0'>
              <h1 className='text-white h0 font-bold'>
                Enjoy Your Dream Vacation
              </h1>
              <div className='px-3 md:px-5 border-white border-solid border-l-2 text-white text-lg md:text-[22px]'>
                We provide a variety of the best lodging accommodations for
                those of you who need it.
              </div>
            </div>

            {/* Stats - Hidden on smaller screens */}
            <div className='hidden md:flex flex-row lg:flex-col gap-6 text-white'>
              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className=' font-bold'>12k+</h2>
                <span className='text-base md:text-xl'>Satisfied Visitors</span>
              </div>

              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className=' font-bold'>4.5k+</h2>
                <span className='text-base md:text-xl'>
                  Amazing Tour Guides
                </span>
              </div>

              <div className='flex flex-col gap-3 md:gap-5'>
                <h2 className=' font-bold'>2k+</h2>
                <span className='text-base md:text-xl'>Managed Properties</span>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className='bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col gap-3 md:gap-5'>
            {/* Tabs */}
            <div className='flex overflow-x-auto hideScrollbar'>
              <button
                onClick={() => handleTabClick('stay')}
                className={`px-4 md:px-6 pt-2 pb-4 font-semibold whitespace-nowrap ${
                  activeTab === 'stay'
                    ? 'border-b-primary border-b-2 text-primary'
                    : 'border-b-transparent border-b-2 text-gray-400'
                }`}
              >
                Stay
              </button>
              <button
                onClick={() => handleTabClick('buy')}
                className={`px-4 md:px-6 pt-2 pb-4 font-semibold whitespace-nowrap ${
                  activeTab === 'buy'
                    ? 'border-b-primary border-b-2 text-primary'
                    : 'border-b-transparent border-b-2 text-gray-400'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => handleTabClick('tourist')}
                className={`px-4 md:px-6 pt-2 pb-4 font-semibold whitespace-nowrap ${
                  activeTab === 'tourist'
                    ? 'border-b-primary border-b-2 text-primary'
                    : 'border-b-transparent border-b-2 text-gray-400'
                }`}
              >
                Tourist Activity
              </button>
            </div>

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

              {/* Check in */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
                    <FaCalendar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>Check in</span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>
                          {checkInDate
                            ? format(checkInDate, 'dd MMM yyyy')
                            : 'Select date'}
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
                      <span className='font-semibold text-left'>Check out</span>
                      <div className='flex justify-between items-center'>
                        <span className='text-gray-500'>
                          {checkOutDate
                            ? format(checkOutDate, 'dd MMM yyyy')
                            : 'Select date'}
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
                    disabled={(date) =>
                      checkInDate ? date < checkInDate : false
                    }
                  />
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
              <Button variant='primary' size='lg' className='w-full md:w-auto'>
                Search
              </Button>
            </div>

            {/* Promotions */}
            <div className='flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 text-sm md:text-base'>
              <p className='font-semibold text-primary'>
                *Exclusive Early Bird Offers – Book Early & Enjoy Special
                Discounts!🌟
              </p>
              <Link
                href='#'
                className='font-semibold text-primary underline whitespace-nowrap'
              >
                Click here to view the list!
              </Link>
            </div>
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

export default HeaderLandingPage;
