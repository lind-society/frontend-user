'use client';

import { format } from 'date-fns';
import { ChevronDown, Slash } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from 'nextjs-toploader/app';
import React, { useMemo, useState } from 'react';
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

import { PreferredOptions } from '@/modules/rent-results/preferred-options';
import { PriceRange } from '@/modules/rent-results/price-range';

interface PreferredOption {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  selected?: boolean;
}

/** Ids the homepage/rent chips and the filter dialog both push to the URL. */
const readSelectedAmenityIds = (params: URLSearchParams): Set<string> => {
  const ids = new Set<string>();
  const single = params.get('amenity');
  if (single) ids.add(single);
  const list = params.get('amenities');
  if (list)
    list
      .split(',')
      .filter(Boolean)
      .forEach((id) => ids.add(id));
  return ids;
};

const HeaderRentResult = () => {
  const t = useTranslations('rentResults');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Location state — seeded from ?location=, which is also what "search"
  // gets sent as (villas don't have a dedicated city filter, only a free-text
  // `search` across name/city/state/country).
  const [location, setLocation] = useState(
    () => searchParams.get('location') ?? 'Bali'
  );
  const locations = ['Bali', 'Jakarta', 'Surabaya', 'Yogyakarta', 'Bandung'];

  // Date selection state
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(() => {
    const fromUrl = searchParams.get('checkIn');
    return fromUrl ? new Date(fromUrl) : new Date();
  });
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(() => {
    const fromUrl = searchParams.get('checkOut');
    if (fromUrl) return new Date(fromUrl);
    return new Date(new Date().setDate(new Date().getDate() + 4));
  });

  // Room and guests state
  const [bedrooms, setBedrooms] = useState(
    () => Number(searchParams.get('bedrooms')) || 1
  );
  const [guests, setGuests] = useState(
    () => Number(searchParams.get('guests')) || 1
  );

  // Price range state
  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 20000000,
  ]);

  const initialSelectedAmenities = useMemo(
    () => readSelectedAmenityIds(searchParams),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Options state with selection tracking — `selected` is seeded from the
  // ?amenity= (single chip click) or ?amenities= (filter dialog) query param,
  // which is how a chip clicked on the homepage/rent page arrives here lit up.
  const [preferredOptions, setPreferredOptions] = useState<PreferredOption[]>(
    (
      [
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
      ] as PreferredOption[]
    ).map((option) => ({
      ...option,
      selected: initialSelectedAmenities.has(option.id),
    }))
  );

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

  // Handle search button click — pushes the current filter state into the
  // URL, which is what `ResultRentContent` (the sibling below) reads to
  // actually query the API. URL is the shared state between the two.
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('location', location);
    if (checkInDate) params.set('checkIn', checkInDate.toISOString());
    if (checkOutDate) params.set('checkOut', checkOutDate.toISOString());
    params.set('bedrooms', String(bedrooms));
    params.set('guests', String(guests));
    params.set('minPrice', String(priceRange[0]));
    params.set('maxPrice', String(priceRange[1]));

    const selectedIds = preferredOptions
      .filter((opt) => opt.selected)
      .map((opt) => opt.id);
    params.delete('amenity');
    if (selectedIds.length > 0) {
      params.set('amenities', selectedIds.join(','));
    } else {
      params.delete('amenities');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className=''>
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

              {/* Check in */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <FaCalendar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.checkIn')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>
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
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <FaCalendar size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.checkOut')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>
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

              {/* Guests */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-bronze/25 rounded'>
                    <FaUser size={24} className='text-primary' />
                    <div className='flex flex-col w-full'>
                      <span className='font-semibold text-left'>
                        {t('search.guests')}
                      </span>
                      <div className='flex justify-between items-center'>
                        <span className='text-ink-muted'>
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
                        className='w-8 h-8 flex items-center justify-center bg-sand/40 rounded-full'
                        disabled={guests <= 1}
                      >
                        -
                      </button>
                      <span className='font-semibold'>
                        {guests.toString().padStart(2, '0')}
                      </span>
                      <button
                        onClick={() => setGuests(Math.min(15, guests + 1))}
                        className='w-8 h-8 flex items-center justify-center bg-sand/40 rounded-full'
                        disabled={guests >= 15}
                      >
                        +
                      </button>
                    </div>
                  </div>
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

      {/* Filters section */}
      <div className='border-b py-6 md:py-8'>
        <BaseContainer>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8'>
            {/* Preferred options section */}
            <PreferredOptions
              options={preferredOptions}
              onToggleOption={handleToggleOption}
              onClearAll={handleClearOptions}
            />

            {/* Price range section */}
            <PriceRange values={priceRange} onValueChange={setPriceRange} />
          </div>
        </BaseContainer>
      </div>
    </div>
  );
};

export default HeaderRentResult;
