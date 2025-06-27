/* eslint-disable no-console */
'use client';

import { format } from 'date-fns';
import { ChevronDown, Heart, Search, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';
import { TbCurrencyDollar } from 'react-icons/tb';

import BaseContainer from '@/components/layouts/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

import { SortOption, sortOptions } from '@/modules/buy-result/result';
import { formatCurrency } from '@/modules/rent/header/price-range';
import {
  activityLocations,
  touristActivities,
  TouristActivity,
} from '@/modules/tourist-activity/constant';
import FilterDialogTourist from '@/modules/tourist-activity/filter-dialog';

interface FilterData {
  cities?: string[];
  // Add other filter properties as needed
}

const ContentTourist1 = () => {
  const t = useTranslations('touristActivity.content');
  const tCategories = useTranslations('touristActivity.categories');
  const tActivities = useTranslations('touristActivity.activities');

  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [activities, setActivities] = useState<TouristActivity[]>([]);
  const [displayLimit, setDisplayLimit] = useState<number>(6);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter and sort activities
  useEffect(() => {
    let filtered = [...touristActivities];

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((activity) =>
        activity.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          activity.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (activity) => activity.price >= minPrice && activity.price <= maxPrice
    );

    // Sort activities
    switch (selectedSort) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;

      case 'recommended':
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setActivities(filtered);
  }, [selectedSort, selectedLocation, searchTerm, minPrice, maxPrice]);

  // Toggle favorite status of an activity
  const toggleFavorite = (activityId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(activityId)) {
        newFavorites.delete(activityId);
      } else {
        newFavorites.add(activityId);
      }
      return newFavorites;
    });
  };

  // Handle search submission
  const handleSearch = () => {
    // Could implement navigation to search results page
    console.log('Search submitted:', { searchTerm, selectedLocation });
  };

  // Show more activities
  const handleShowMore = () => {
    setDisplayLimit((prev) => prev + 6);
  };

  const handleApplyFilters = (filterData: FilterData) => {
    // Update location based on selected cities
    if (filterData.cities && filterData.cities.length > 0) {
      setSelectedLocation(filterData.cities[0]); // Set to first selected city
    }

    // Update other filters in content-1.tsx as needed
    // These will be used in the useEffect to filter activities
  };

  return (
    <div className='py-[32px] md:py-[64px] bg-bg'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          {/* Header section */}
          <div className='flex flex-col gap-2 text-center items-center'>
            <h4 className='text-primary text-xl md:text-2xl font-semibold'>
              {t('title')}
            </h4>
            <span className='max-w-[850px] text-text'>{t('subtitle')}</span>
          </div>

          {/* Search section */}
          <div className='flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8'>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className='w-full md:w-[240px] h-[46px] md:h-[58px]'>
                <SelectValue placeholder={t('search.location')} />
              </SelectTrigger>
              <SelectContent>
                {activityLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className='flex border rounded-md w-full md:w-auto'>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('search.searchPlaceholder')}
                className='border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none py-3 px-4 w-full md:w-[400px]'
              />
              <button
                className='bg-primary rounded-r-md p-4 text-white flex items-center justify-center'
                onClick={handleSearch}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Activity count */}
          <div className='flex gap-2 items-center'>
            <span className='font-medium text-gray-500'>
              {t('search.availableActivity')}:
            </span>
            <span className='text-xl text-primary'>{activities.length}</span>
          </div>

          {/* Filter controls */}
          <div className='flex flex-col md:flex-row justify-between w-full gap-4'>
            <div className='flex flex-wrap gap-3 md:gap-8'>
              {/* Date availability */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='outline' className='flex gap-2 items-center'>
                    <FaCalendar className='text-primary text-xl' />
                    <span className='text-primary'>
                      {selectedDate
                        ? format(selectedDate, 'PP')
                        : t('search.availability')}
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
                  <Button variant='outline' className='flex gap-2 items-center'>
                    <TbCurrencyDollar className='text-primary text-xl' />
                    <span className='text-primary'>
                      {minPrice === 0 && maxPrice === 5000000
                        ? t('search.priceRange')
                        : `${formatCurrency(minPrice)} - ${formatCurrency(
                            maxPrice
                          )}`}
                    </span>
                    <ChevronDown className='text-primary' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-80 p-4'>
                  <div className='flex flex-col gap-4'>
                    <span className='font-medium'>
                      {t('search.priceRange')}
                    </span>
                    <div className='flex justify-between'>
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm text-gray-500'>
                          {t('search.minPrice')}
                        </span>
                        <input
                          type='number'
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className='w-32 border rounded-md p-2'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm text-gray-500'>
                          {t('search.maxPrice')}
                        </span>
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
            </div>

            <div className='flex gap-3 md:gap-8'>
              {/* Filters button */}
              <FilterDialogTourist onApplyFilters={handleApplyFilters} />

              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex items-center justify-center gap-2 text-primary text-xs font-semibold'
                  >
                    <span className='whitespace-nowrap'>
                      {t('search.sortBy')}{' '}
                      {
                        sortOptions.find((opt) => opt.value === selectedSort)
                          ?.label
                      }
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      className={`cursor-pointer ${
                        selectedSort === option.value
                          ? 'bg-primary/10 text-primary font-medium'
                          : ''
                      }`}
                      onClick={() => setSelectedSort(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Activity cards grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {activities.slice(0, displayLimit).map((activity) => (
              <div
                key={activity.id}
                className='flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-white hover:shadow-md transition-shadow'
              >
                {/* Card image */}
                <div className='relative h-[240px] w-full'>
                  <Link href={`/tourist-activity/${activity.id}`}>
                    <Image
                      className='w-full h-full object-cover'
                      src={activity.images[0]}
                      alt={tActivities(`${activity.id}.name`)}
                      sizes='100vw'
                      width={0}
                      height={0}
                    />
                  </Link>

                  {/* Rating badge */}
                  <div className='absolute left-0 bottom-0 bg-primary px-4 py-2 rounded-tr-lg z-10 flex gap-2 items-center'>
                    <Star className='text-white' size={16} />
                    <span className='text-white'>
                      {activity.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={() => toggleFavorite(activity.id)}
                    className='absolute right-4 top-4 bg-white/80 hover:bg-white rounded-full p-2 transition-colors'
                  >
                    <Heart
                      size={20}
                      className={
                        favorites.has(activity.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }
                    />
                  </button>
                </div>

                {/* Location and category */}
                <div className='px-6 py-4 flex justify-between border-b'>
                  <span className='text-sm text-text'>{activity.location}</span>
                  <Badge className='bg-primary px-3 rounded-md'>
                    {tCategories(activity.category)}
                  </Badge>
                </div>

                {/* Activity details */}
                <div className='px-6 py-4 flex flex-col gap-2'>
                  <div className='flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2'>
                    <Link
                      href={`/tourist-activity/${activity.id}`}
                      className='hover:text-primary/80'
                    >
                      <p className='text-lg md:text-xl text-primary font-semibold'>
                        {tActivities(`${activity.id}.name`)}
                      </p>
                    </Link>
                    <div className='flex flex-col text-start md:text-end items-start md:items-end text-primary'>
                      <span className='text-lg md:text-[22px] font-bold whitespace-nowrap'>
                        {activity.currency} {activity.price.toLocaleString()}
                      </span>
                      <span className='italic text-xs md:text-sm font-normal'>
                        /{t(`cards.${activity.priceUnit}`)}
                      </span>
                    </div>
                  </div>
                  <p className='text-gray-600 font-normal text-sm md:text-base line-clamp-3'>
                    {tActivities(`${activity.id}.description`)}
                  </p>
                  <div className='flex justify-between items-center mt-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs px-2 py-1 bg-gray-100 rounded-md'>
                        {activity.duration}
                      </span>
                      <span className='text-xs px-2 py-1 bg-gray-100 rounded-md'>
                        {activity.groupSize === 'Individual'
                          ? t('cards.individualGroup')
                          : activity.groupSize.includes('Max')
                          ? t('cards.maxPeople', {
                              count: activity.groupSize.match(/\d+/)?.[0] || '',
                            })
                          : activity.groupSize === 'Small group'
                          ? t('cards.smallGroup')
                          : activity.groupSize === 'Full day'
                          ? t('cards.fullDay')
                          : activity.groupSize}
                      </span>
                    </div>
                    <span className='text-xs text-gray-500'>
                      {activity.reviews} {t('cards.reviews')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show more button */}
          {activities.length > displayLimit && (
            <div className='w-full flex justify-center'>
              <Button
                variant='outline'
                className='w-fit'
                onClick={handleShowMore}
              >
                {t('buttons.showMore')} ({activities.length - displayLimit})
              </Button>
            </div>
          )}
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

export default ContentTourist1;
