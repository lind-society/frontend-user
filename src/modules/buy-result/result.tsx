'use client';

import { ChevronDown, Share, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import { IoMapOutline } from 'react-icons/io5';

import { toPropertyCard } from '@/lib/mappers/property';
import { useProperties } from '@/hooks/api/useProperty';
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

const MapView = dynamic(() => import('@/components/ui/map-view'), {
  ssr: false,
});

export type SortOption = 'recommended' | 'price-low' | 'price-high' | 'newest';

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

export const sortOptions: SortOptionConfig[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'newest', label: 'Newest First' },
];

const SORT_MAP: Record<SortOption, string | undefined> = {
  recommended: undefined,
  'price-low': 'price',
  'price-high': '-price',
  newest: '-createdAt',
};

const PAGE_SIZE = 6;

const BuyResultDisplay = () => {
  const states = useTranslations('states');
  const searchParams = useSearchParams();

  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [showMap, setShowMap] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Built from whatever buy-result/header.tsx wrote into the URL.
  const filterParams = useMemo(() => {
    const params: Record<string, string> = {};

    const location = searchParams.get('location');
    if (location) params.search = location;

    const ownership = searchParams.get('ownership');
    if (ownership === 'leasehold' || ownership === 'freehold') {
      params['filter.ownershipType'] = `$eq:${ownership}`;
    }

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice) params['filter.price'] = `$gte:${minPrice}`;
    if (maxPrice) {
      params['filter.price'] = params['filter.price']
        ? `${params['filter.price']},$lte:${maxPrice}`
        : `$lte:${maxPrice}`;
    }

    return params;
  }, [searchParams]);

  const { data, isLoading, isError } = useProperties({
    page: 1,
    limit,
    sortBy: SORT_MAP[selectedSort],
    ...filterParams,
  });

  const properties = useMemo(
    () => (data?.data.data ?? []).map(toPropertyCard),
    [data]
  );
  const rawProperties = data?.data.data ?? [];
  const totalItems = data?.data.meta.totalItems ?? 0;
  const hasMore = properties.length < totalItems;

  const { pins } = useVillaMapPins(
    rawProperties.map((property) => ({
      id: property.id,
      name: property.name,
      mapLink: property.mapLink,
    }))
  );

  const handleShowMore = () => setLimit((prev) => prev + PAGE_SIZE);

  // TODO(Grup F / wishlist): wire to the real localStorage-backed toggle.
  const toggleFavorite = () => undefined;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'LIND Society - Property Results',
          text: 'Check out these amazing properties I found on LIND Society!',
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
              Available properties: <strong>{totalItems}</strong>
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
                      <span>Property Map View</span>
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

      <div className={`w-full py-6 ${showMap ? 'bg-cream-light' : ''}`}>
        <BaseContainer>
          <>
            {isError && (
              <StateMessage
                variant='error'
                title={states('error.properties')}
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
                    {properties.map((property) => (
                      <VillaCard
                        key={property.id}
                        villa={property}
                        rentType='sale'
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
                        Show more properties
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
                {properties.map((property) => (
                  <VillaCard
                    key={property.id}
                    villa={property}
                    rentType='sale'
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
                      Show more properties
                    </Button>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !isError && properties.length === 0 && (
              <StateMessage
                title={states('empty.properties')}
                description={states('empty.propertiesDescription')}
              />
            )}
          </>
        </BaseContainer>
      </div>
    </div>
  );
};

export default BuyResultDisplay;
