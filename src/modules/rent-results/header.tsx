'use client';

import { format } from 'date-fns';
import { ChevronDown, Slash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { BiSwim } from 'react-icons/bi';
import { FaParking, FaUmbrellaBeach } from 'react-icons/fa';
import { FaCalendar, FaLocationDot, FaUser } from 'react-icons/fa6';
import { GrYoga } from 'react-icons/gr';
import { IoBed } from 'react-icons/io5';
import { IoWifiOutline } from 'react-icons/io5';
import { MdKitchen, MdOutlinePets, MdOutlineSecurity } from 'react-icons/md';
import { PiMountainsDuotone } from 'react-icons/pi';
import { RiRoadMapLine } from 'react-icons/ri';
import { TbAirConditioning, TbGrill, TbMassage } from 'react-icons/tb';

import BaseContainer from '@/components/layouts/container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { PriceRange } from '@/modules/rent-results/price-range';

interface PreferredOption {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  selected?: boolean;
}

const HeaderRentResult = () => {
  const t = useTranslations('rentResults');

  // Location state
  const [location, setLocation] = useState('Bali');
  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  // Date selection state
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 4))
  );

  // Room and guests state
  const [bedrooms, setBedrooms] = useState(1);
  const [guests, setGuests] = useState(1);

  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]);

  // Options state with selection tracking
  const [preferredOptions, setPreferredOptions] = useState<PreferredOption[]>([
    {
      id: 'air-cond',
      labelKey: 'airConditioner',
      icon: <TbAirConditioning size={20} />,
      selected: false,
    },
    {
      id: 'pool',
      labelKey: 'pool',
      icon: <BiSwim size={20} />,
      selected: false,
    },
    {
      id: 'kitchen',
      labelKey: 'kitchen',
      icon: <MdKitchen size={20} />,
      selected: false,
    },
    {
      id: 'parking',
      labelKey: 'parking',
      icon: <FaParking size={20} />,
      selected: false,
    },
    {
      id: 'beach',
      labelKey: 'beachfront',
      icon: <FaUmbrellaBeach size={20} />,
      selected: false,
    },
    {
      id: 'wifi',
      labelKey: 'freeWifi',
      icon: <IoWifiOutline size={20} />,
      selected: false,
    },
    {
      id: 'pets',
      labelKey: 'petFriendly',
      icon: <MdOutlinePets size={20} />,
      selected: false,
    },
    {
      id: 'security',
      labelKey: 'security',
      icon: <MdOutlineSecurity size={20} />,
      selected: false,
    },
    {
      id: 'mountain',
      labelKey: 'mountainView',
      icon: <PiMountainsDuotone size={20} />,
      selected: false,
    },
    {
      id: 'massage',
      labelKey: 'massage',
      icon: <TbMassage size={20} />,
      selected: false,
    },
    {
      id: 'bbq',
      labelKey: 'bbqGrill',
      icon: <TbGrill size={20} />,
      selected: false,
    },
    {
      id: 'yoga',
      labelKey: 'yoga',
      icon: <GrYoga size={20} />,
      selected: false,
    },
    {
      id: 'seaview',
      labelKey: 'seaView',
      icon: <RiRoadMapLine size={20} />,
      selected: false,
    },
  ]);

  // Handle option selection toggle
  const handleToggleOption = (id: string) => {
    setPreferredOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, selected: !option.selected } : option
      )
    );
  };

  // Handle clearing all selected options
  const handleClearOptions = () => {
    setPreferredOptions((prev) =>
      prev.map((option) => ({ ...option, selected: false }))
    );
  };

  // Handle search button click
  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log('Search with parameters:', {
      location,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      bedrooms,
      guests,
      priceRange,
      selectedOptions: preferredOptions
        .filter((opt) => opt.selected)
        .map((opt) => opt.id),
    });
    // Actual search implementation would go here
  };

  return (
    <div className=''>
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
                  <BreadcrumbLink href='/rent/result'>
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
                      <span className='font-semibold text-left'>
                        {t('search.checkOut')}
                      </span>
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
                      <span>{t('search.guestDescription')}</span>
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
                        onClick={() => setGuests(Math.min(15, guests + 1))}
                        className='w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full'
                        disabled={guests >= 15}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Amenities/Preferred Options */}
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between items-center'>
                <span className='text-lg md:text-[22px] text-primary font-semibold'>
                  {t('preferredOptions.title')}
                </span>
                <Button
                  variant='link'
                  className='text-text text-sm font-medium p-0'
                  onClick={handleClearOptions}
                >
                  {t('preferredOptions.clearAll')}
                </Button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {preferredOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={option.selected ? 'default' : 'outline'}
                    className={`flex items-center gap-2 ${
                      option.selected
                        ? 'bg-primary text-white'
                        : 'text-gray-500'
                    }`}
                    onClick={() => handleToggleOption(option.id)}
                  >
                    <span
                      className={
                        option.selected ? 'text-white' : 'text-gray-500'
                      }
                    >
                      {option.icon}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        option.selected ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {t(`search.amenities.${option.labelKey}`)}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className='flex flex-col gap-3'>
              <span className='text-lg md:text-[22px] text-primary font-semibold'>
                {t('search.priceRange')}
              </span>
              <PriceRange values={priceRange} onValueChange={setPriceRange} />
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
    </div>
  );
};

export default HeaderRentResult;
