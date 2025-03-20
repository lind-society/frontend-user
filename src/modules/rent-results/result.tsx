/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';

import { ChevronDown, Share, SlidersHorizontal, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { IoMapOutline } from 'react-icons/io5';
import { MdLocationOn } from 'react-icons/md';

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

import { villas } from '@/modules/rent/constant';

type SortOption = 'recommended' | 'price-low' | 'price-high' | 'newest';

interface SortOptionConfig {
  value: SortOption;
  label: string;
}

// Simple map component to simulate a map view
const MapView = ({ villas }: { villas: any[] }) => {
  return (
    <div className='relative bg-gray-100 w-full h-full rounded-lg overflow-hidden border min-h-[600px] lg:min-h-[800px]'>
      {/* This would be replaced with an actual map library like Google Maps or Mapbox */}
      <div className='absolute inset-0 bg-[url("/images/map.png")] bg-cover bg-center opacity-80'></div>

      {/* Villa location markers */}
      <div className='absolute inset-0 p-4'>
        {villas.map((villa) => (
          <div
            key={villa.id}
            className='absolute p-1 bg-white rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform'
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            title={villa.name}
          >
            <MdLocationOn className='text-primary text-xl' />
          </div>
        ))}
      </div>

      {/* Map legend */}
      <div className='absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md'>
        <p className='text-xs text-gray-500'>Map view (placeholder)</p>
      </div>
    </div>
  );
};

const sortOptions: SortOptionConfig[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'newest', label: 'Newest First' },
];

const ResultRentContent = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [visibleVillas, setVisibleVillas] = useState(6); // Initially show 6 villas
  const [isFavorite, setIsFavorite] = useState<Record<number, boolean>>({});
  const [showMap, setShowMap] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Total number of available villas
  const totalVillas = villas.length;
  const remainingVillas = totalVillas - visibleVillas;

  const toggleFavorite = (id: number) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log(`Toggled favorite for villa ${id}`);
  };

  const handleShowMore = () => {
    // Show 6 more villas each time
    setVisibleVillas((prev) => Math.min(prev + 6, totalVillas));
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'LIND Society - Rental Results',
          text: 'Check out these amazing villas I found on LIND Society!',
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error);
    }
  };

  // Toggle map view
  const toggleMap = () => {
    if (isMobile) {
      setShowMobileMap(true);
    } else {
      setShowMap(!showMap);
    }
  };

  return (
    <div className='bg-gray-50 py-4 md:py-8'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 w-full'>
          {/* Top bar - Responsive layout */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 w-full'>
            <span className='text-gray-500 font-medium order-2 sm:order-1'>
              Available rental property: <strong>{totalVillas}</strong>
            </span>
            <div className='flex gap-3 md:gap-6 items-center order-1 sm:order-2'>
              {/* Mobile filter button with sheet */}
              <Button
                variant='outline'
                className='flex gap-2 items-center md:hidden'
              >
                <SlidersHorizontal size={18} className='text-primary' />
                <span className='text-primary'>Filters</span>
              </Button>

              {/* Desktop filter button */}
              <Button
                variant='outline'
                className='hidden md:flex gap-2 items-center'
                onClick={() => console.log('Desktop filters clicked')}
              >
                <SlidersHorizontal size={18} className='text-primary' />
                <span className='text-primary'>Filters</span>
              </Button>

              {/* Map button - Now toggles map visibility */}
              <Button
                variant={showMap ? 'default' : 'outline'}
                className={`flex gap-2 items-center ${
                  showMap ? 'bg-primary text-white' : 'text-primary'
                }`}
                onClick={toggleMap}
              >
                <IoMapOutline
                  size={18}
                  className={showMap ? 'text-white' : 'text-primary'}
                />
                <span className={showMap ? 'text-white' : 'text-primary'}>
                  {showMap ? 'Hide map' : 'Show map'}
                </span>
              </Button>

              {/* Mobile Map Dialog */}
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
                    <MapView villas={villas} />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Action buttons - Responsive flex layout */}
          <div className='flex flex-col sm:flex-row justify-between gap-3 sm:gap-0'>
            {/* Share button */}
            <Button
              variant='primary'
              className='flex items-center justify-center gap-2 w-fit'
              onClick={handleShare}
            >
              <Share size={16} />
              <span className='whitespace-nowrap'>Share results</span>
            </Button>

            {/* Sort dropdown */}
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

      {/* Full-width container for better layout when map is shown */}
      <div className={`w-full py-6  ${showMap ? 'bg-white ' : ''}`}>
        <BaseContainer>
          <div className=''>
            {/* Villa grid with optional map - Improved responsive layout */}
            {showMap ? (
              <div className='flex flex-col lg:flex-row w-full gap-0 lg:gap-4'>
                {/* Cards section - Takes 2/3 of the width on desktop with map */}
                <div className='w-full lg:w-2/3'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                    {villas.slice(0, visibleVillas).map((villa) => (
                      <VillaCard
                        key={villa.id}
                        villa={{
                          ...villa,
                          isFavorite: !!isFavorite[villa.id],
                        }}
                        onFavoriteToggle={toggleFavorite}
                      />
                    ))}
                  </div>

                  {/* Show more button inside the cards section */}
                  {remainingVillas > 0 && (
                    <div className='flex justify-center my-4'>
                      <Button
                        variant='ghost'
                        className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
                        onClick={handleShowMore}
                      >
                        Show more rental villas ({remainingVillas})
                      </Button>
                    </div>
                  )}
                </div>

                {/* Map section - Takes 1/3 of the width on desktop */}
                <div className='hidden lg:block lg:w-1/3 h-screen sticky top-0 p-4 pr-0'>
                  <MapView villas={villas} />
                </div>
              </div>
            ) : (
              /* Regular grid layout when map is hidden */
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
                {villas.slice(0, visibleVillas).map((villa) => (
                  <VillaCard
                    key={villa.id}
                    villa={{
                      ...villa,
                      isFavorite: !!isFavorite[villa.id],
                    }}
                    onFavoriteToggle={toggleFavorite}
                  />
                ))}

                {/* Show more button below the grid */}
                {remainingVillas > 0 && (
                  <div className='col-span-full flex justify-center mt-2 md:mt-4'>
                    <Button
                      variant='ghost'
                      className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
                      onClick={handleShowMore}
                    >
                      Show more rental villas ({remainingVillas})
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </BaseContainer>
      </div>
    </div>
  );
};

export default ResultRentContent;
