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

import { toTouristActivity } from '@/lib/mappers/activity';
import { useActivities } from '@/hooks/api/useActivity';

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
  TouristActivity,
} from '@/modules/tourist-activity/constant';
import FilterDialogTourist from '@/modules/tourist-activity/filter-dialog';

interface FilterData {
  cities?: string[];
  // Add other filter properties as needed
}

const ContentTourist1 = () => {
  const t = useTranslations('touristActivity.content');

  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [activities, setActivities] = useState<TouristActivity[]>([]);
  const [displayLimit, setDisplayLimit] = useState<number>(6);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  /**
   * Filtering and sorting below run client-side over the full result set, so we
   * request a single generous page rather than paginating server-side. Bump
   * this if a tenant ever exceeds it — the API caps nothing on its own.
   */
  const { data: activitiesResponse, isLoading } = useActivities({
    page: 1,
    limit: 200,
  });

  const sourceActivities = React.useMemo(
    () => (activitiesResponse?.data.data ?? []).map(toTouristActivity),
    [activitiesResponse]
  );

  // Filter and sort activities
  useEffect(() => {
    let filtered = [...sourceActivities];

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
  }, [
    sourceActivities,
    selectedSort,
    selectedLocation,
    searchTerm,
    minPrice,
    maxPrice,
  ]);

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
            <div className='flex border rounded w-full md:w-auto'>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('search.searchPlaceholder')}
                className='border-none focus-visible:ring-0 focus-visible:outline-none focus-visible:border-none py-3 px-4 w-full md:w-[400px]'
              />
              <button
                type='button'
                aria-label={t('search.searchButton')}
                className='flex items-center justify-center rounded-r bg-bronze-600 p-4 text-white transition-colors hover:bg-bronze-700'
                onClick={handleSearch}
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Activity count */}
          <div className='flex gap-2 items-center'>
            <span className='font-medium text-ink-muted'>
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
                        <span className='text-sm text-ink-muted'>
                          {t('search.minPrice')}
                        </span>
                        <input
                          type='number'
                          value={minPrice}
                          onChange={(e) => setMinPrice(Number(e.target.value))}
                          className='w-32 border rounded p-2'
                        />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <span className='text-sm text-ink-muted'>
                          {t('search.maxPrice')}
                        </span>
                        <input
                          type='number'
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className='w-32 border rounded p-2'
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className='flex flex-wrap gap-3 md:gap-8'>
              {/* Filters button */}
              <FilterDialogTourist onApplyFilters={handleApplyFilters} />

              {/* Sort dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex max-w-full items-center justify-center gap-2 text-xs font-semibold text-bronze-600'
                  >
                    <span className='truncate'>
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
          {isLoading && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className='h-[380px] rounded bg-sand/40 animate-pulse'
                />
              ))}
            </div>
          )}

          {!isLoading && activities.length === 0 && (
            <p className='text-center text-ink-muted py-8'>
              No activities found.
            </p>
          )}

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {activities.slice(0, displayLimit).map((activity) => (
              <div
                key={activity.id}
                className='flex flex-col rounded overflow-hidden border border-bronze/25 bg-cream-light hover:shadow-sm transition-shadow'
              >
                {/* Card image */}
                <div className='relative h-[240px] w-full'>
                  <Link href={`/tourist-activity/${activity.id}`}>
                    <Image
                      className='w-full h-full object-cover'
                      // An activity with no photos yet gave `<Image>` an
                      // undefined `src`, which Next throws a hard render
                      // error on — that took the whole page down to the
                      // error boundary instead of just that one card.
                      src={
                        activity.images[0] ||
                        '/images/modern-villa-background.webp'
                      }
                      alt={activity.name}
                      sizes='100vw'
                      width={0}
                      height={0}
                    />
                  </Link>

                  {/* Rating badge */}
                  <div className='absolute left-0 bottom-0 bg-primary px-4 py-2 rounded-tr z-10 flex gap-2 items-center'>
                    <Star className='text-cream' size={16} />
                    <span className='text-cream'>
                      {activity.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    type='button'
                    aria-label={t('favorite')}
                    aria-pressed={favorites.has(activity.id)}
                    onClick={() => toggleFavorite(activity.id)}
                    className='absolute right-4 top-4 rounded-full bg-cream-light/80 p-2 transition-colors hover:bg-cream-light'
                  >
                    <Heart
                      size={20}
                      className={
                        favorites.has(activity.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-ink-soft'
                      }
                    />
                  </button>
                </div>

                {/* Location and category */}
                <div className='px-6 py-4 flex justify-between border-b'>
                  <span className='text-sm text-text'>{activity.location}</span>
                  <Badge className='bg-primary px-3 rounded'>
                    {activity.category}
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
                        {activity.name}
                      </p>
                    </Link>
                    <div className='flex flex-col text-start md:text-end items-start md:items-end text-primary'>
                      <span className='text-lg md:text-[22px] font-bold whitespace-nowrap'>
                        {activity.currency} {activity.price.toLocaleString()}
                      </span>
                      <span className='italic text-xs md:text-sm font-normal'>
                        /{activity.priceUnit}
                      </span>
                    </div>
                  </div>
                  <p className='text-ink-soft font-normal text-sm md:text-base line-clamp-3'>
                    {activity.description}
                  </p>
                  <div className='flex justify-between items-center mt-2'>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs px-2 py-1 bg-sand/40 rounded'>
                        {activity.duration}
                      </span>
                      <span className='text-xs px-2 py-1 bg-sand/40 rounded'>
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
                    <span className='text-xs text-ink-muted'>
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
