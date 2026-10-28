'use client';

import { ChevronDown, Share, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import { IoMapOutline } from 'react-icons/io5';

import { AMENITY_FACILITY_KEYWORDS } from '@/lib/amenity-keywords';
import { toVillaCard } from '@/lib/mappers/villa';
import { useVillas } from '@/hooks/api/useVilla';
import { useVillaMapPins } from '@/hooks/api/useVillaMapPins';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { VillaCard } from '@/components/ui/card/villa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StateMessage } from '@/components/ui/state-message';

// Leaflet touches `window` at import time — must stay client-only.
const MapView = dynamic(() => import('@/components/ui/map-view'), {
  ssr: false,
});

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'newest';

interface SortOptionConfig {
  value: SortOption;
  label: string;
}

const sortOptions: SortOptionConfig[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'newest', label: 'Newest First' },
];

const SORT_MAP: Record<SortOption, string | undefined> = {
  recommended: undefined,
  'price-low': 'dailyPrice',
  'price-high': '-dailyPrice',
  newest: '-createdAt',
};

const PAGE_SIZE = 6;

const ResultRentContent = () => {
  const states = useTranslations('states');
  const searchParams = useSearchParams();

  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [showMap, setShowMap] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Build the API filter from whatever the header (a sibling component)
  // wrote into the URL — see rent-results/header.tsx `handleSearch`.
  const filterParams = useMemo(() => {
    const params: Record<string, string> = {};

    const location = searchParams.get('location');
    if (location) params.search = location;

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice) params['filter.dailyPrice'] = `$gte:${minPrice}`;
    if (maxPrice) {
      params['filter.dailyPrice'] = params['filter.dailyPrice']
        ? `${params['filter.dailyPrice']},$lte:${maxPrice}`
        : `$lte:${maxPrice}`;
    }

    const amenityIds = new Set<string>();
    const single = searchParams.get('amenity');
    if (single) amenityIds.add(single);
    searchParams
      .get('amenities')
      ?.split(',')
      .filter(Boolean)
      .forEach((id) => amenityIds.add(id));

    // nestjs-paginate only takes one value per filter key from a plain
    // object — the first selected amenity is the strongest, most direct
    // signal (matches the "click POOL, results filter by POOL" case this
    // was reported against).
    const firstAmenity = Array.from(amenityIds)[0];
    if (firstAmenity && AMENITY_FACILITY_KEYWORDS[firstAmenity]) {
      params[
        'filter.villaFacilities.facility.name'
      ] = `$ilike:${AMENITY_FACILITY_KEYWORDS[firstAmenity]}`;
    }

    return params;
  }, [searchParams]);

  const { data, isLoading, isError } = useVillas({
    page: 1,
    limit,
    sortBy: SORT_MAP[selectedSort],
    ...filterParams,
  });

  const villas = useMemo(
    () => (data?.data.data ?? []).map(toVillaCard),
    [data]
  );
  const rawVillas = data?.data.data ?? [];
  const totalItems = data?.data.meta.totalItems ?? 0;
  const hasMore = villas.length < totalItems;

  const { pins } = useVillaMapPins(
    rawVillas.map((villa) => ({
      id: villa.id,
      name: villa.name,
      mapLink: villa.mapLink,
    }))
  );

  const handleShowMore = () => setLimit((prev) => prev + PAGE_SIZE);

  // TODO(Grup F / wishlist): wire to the real localStorage-backed toggle once
  // that lands — matches the stub already used in buy/recomendation-properties.tsx.
  const toggleFavorite = () => undefined;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'LIND Society - Rental Results',
          text: 'Check out these amazing villas I found on LIND Society!',
          url: window.location.href,
        })
        .catch(() => undefined);
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => undefined);
    }
  };

  const toggleMap = () => {
    if (window.innerWidth < 1024) {
      setShowMobileMap(true);
    } else {
      setShowMap((prev) => !prev);
    }
  };

  return (
    <div className='bg-bone py-4 md:py-8'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 w-full'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 w-full'>
            <span className='text-ink-muted font-medium order-2 sm:order-1'>
              Available rental property: <strong>{totalItems}</strong>
            </span>
            <div className='flex gap-3 md:gap-6 items-center order-1 sm:order-2'>
              <Button
                variant={showMap ? 'default' : 'outline'}
                className={`flex gap-2 items-center ${
                  showMap ? 'bg-primary text-cream' : 'text-primary'
                }`}
                onClick={toggleMap}
              >
                <IoMapOutline
                  size={18}
                  className={showMap ? 'text-cream' : 'text-primary'}
                />
                <span className={showMap ? 'text-cream' : 'text-primary'}>
                  {showMap ? 'Hide map' : 'Show map'}
                </span>
              </Button>

              <Dialog open={showMobileMap} onOpenChange={setShowMobileMap}>
                <DialogContent className='sm:max-w-[90vw] h-[80vh]'>
                  <DialogHeader>
                    <DialogTitle className='flex justify-between items-center'>
                      <span>Map View</span>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setShowMobileMap(false)}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </DialogTitle>
                  </DialogHeader>
                  <div className='h-full overflow-hidden'>
                    <MapView pins={pins} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
            <Button
              variant='primary'
              className='flex items-center justify-center gap-2 w-fit'
              onClick={handleShare}
            >
              <Share size={16} />
              <span className='whitespace-nowrap'>Share results</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='flex items-center justify-center gap-2'
                >
                  <span className='whitespace-nowrap'>
                    Sort by{' '}
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
      </BaseContainer>

      <div className={`w-full py-6  ${showMap ? 'bg-cream-light ' : ''}`}>
        <BaseContainer>
          <>
            {isError && (
              <StateMessage
                variant='error'
                title={states('error.villas')}
                description={states('error.description')}
              />
            )}

            {isLoading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <div
                    key={index}
                    className='h-[420px] rounded bg-sand/40 animate-pulse'
                  />
                ))}
              </div>
            ) : showMap ? (
              <div className='flex flex-col lg:flex-row w-full gap-0 lg:gap-4'>
                <div className='w-full lg:w-2/3'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                    {villas.map((villa) => (
                      <VillaCard
                        key={villa.id}
                        villa={villa}
                        rentType='rent'
                        onFavoriteToggle={toggleFavorite}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className='flex justify-center my-4'>
                      <Button
                        variant='ghost'
                        className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
                        onClick={handleShowMore}
                      >
                        Show more rental villas
                      </Button>
                    </div>
                  )}
                </div>

                <div className='hidden lg:block lg:w-1/3 h-screen sticky top-0 p-4 pr-0'>
                  <MapView pins={pins} />
                </div>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                {villas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    rentType='rent'
                    villa={villa}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}

                {hasMore && (
                  <div className='col-span-full flex justify-center mt-2 md:mt-4'>
                    <Button
                      variant='ghost'
                      className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
                      onClick={handleShowMore}
                    >
                      Show more rental villas
                    </Button>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !isError && villas.length === 0 && (
              <StateMessage
                title={states('empty.villas')}
                description={states('empty.villasDescription')}
              />
            )}
          </>
        </BaseContainer>
      </div>
    </div>
  );
};

export default ResultRentContent;
