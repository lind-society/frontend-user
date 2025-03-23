/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';

import { ChevronDown, Share, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FaHome, FaSearchDollar } from 'react-icons/fa';
import { GiIsland, GiPalmTree } from 'react-icons/gi';
import { IoMapOutline, IoWater } from 'react-icons/io5';
import { MdLocationOn, MdOutlineVilla } from 'react-icons/md';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
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

import { PropertyCard } from '@/modules/buy-result/property-card';

// Sample property data for buy page
const properties = [
  {
    id: 1,
    name: 'Luxury Villa Bali',
    location: 'Ubud, Bali',
    images: ['/images/explore-1.png'],
    price: 850000,
    features: {
      bedrooms: 4,
      bathrooms: 3,
      area: 350, // in sqm
    },
    ownership: 'Leasehold',
    description: 'Beautiful villa with private pool and jungle views.',
    tags: ['Jungle View', 'Private Pool', 'Rental Ready'],
  },
  {
    id: 2,
    name: 'Beachfront Estate',
    location: 'Seminyak, Bali',
    images: ['/images/explore-2.png'],
    price: 1250000,
    features: {
      bedrooms: 5,
      bathrooms: 5,
      area: 450, // in sqm
    },
    ownership: 'Freehold',
    description: 'Stunning beachfront property with direct beach access.',
    tags: ['Ocean View', 'High End Luxury', 'Instant Income'],
  },
  {
    id: 3,
    name: 'Modern Private Villa',
    location: 'Canggu, Bali',
    images: ['/images/explore-3.png'],
    price: 675000,
    features: {
      bedrooms: 3,
      bathrooms: 3,
      area: 280, // in sqm
    },
    ownership: 'Leasehold',
    description: 'Contemporary villa with modern design in popular area.',
    tags: ['Rental Ready', 'Private Pool'],
  },
  {
    id: 4,
    name: 'Luxury Land Plot',
    location: 'Tabanan, Bali',
    images: ['/images/explore-2.png'],
    price: 450000,
    features: {
      area: 1200, // in sqm
    },
    ownership: 'Freehold',
    description:
      'Prime land with rice field and ocean views, perfect for development.',
    tags: ['Land Plots', 'Ocean View'],
  },
  {
    id: 5,
    name: 'Hillside Investment Property',
    location: 'Uluwatu, Bali',
    images: ['/images/explore-1.png'],
    price: 925000,
    features: {
      bedrooms: 4,
      bathrooms: 4,
      area: 320, // in sqm
    },
    ownership: 'Leasehold',
    description: 'Prime investment property with stunning ocean views.',
    tags: ['Instant Income', 'Ocean View'],
  },
  {
    id: 6,
    name: 'Tropical Luxury Estate',
    location: 'Nusa Dua, Bali',
    images: ['/images/explore-3.png'],
    price: 1750000,
    features: {
      bedrooms: 6,
      bathrooms: 6,
      area: 550, // in sqm
    },
    ownership: 'Freehold',
    description: 'Elite tropical estate with premium finishes and amenities.',
    tags: ['High End Luxury', 'Rental Ready'],
  },
];

export type SortOption = 'recommended' | 'price-low' | 'price-high' | 'newest';

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

// Map component to show property locations
const MapView = ({ properties }: { properties: any[] }) => {
  return (
    <div className='relative bg-gray-100 w-full h-full rounded-lg overflow-hidden border min-h-[600px] lg:min-h-[800px]'>
      {/* This would be replaced with an actual map library like Google Maps or Mapbox */}
      <div className='absolute inset-0 bg-[url("/images/map.png")] bg-cover bg-center opacity-80'></div>

      {/* Property location markers */}
      <div className='absolute inset-0 p-4'>
        {properties.map((property) => (
          <div
            key={property.id}
            className='absolute p-1 bg-white rounded-full shadow-md cursor-pointer hover:scale-110 transition-transform'
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            title={property.name}
          >
            <MdLocationOn className='text-primary text-xl' />
          </div>
        ))}
      </div>

      {/* Map legend */}
      <div className='absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md'>
        <p className='text-xs text-gray-500'>
          Map view (showing property locations)
        </p>
      </div>
    </div>
  );
};

export const sortOptions: SortOptionConfig[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
  { value: 'newest', label: 'Newest First' },
];

// Tags to icons mapping
const tagIcons = {
  'Instant Income': <FaSearchDollar size={16} />,
  'Rental Ready': <FaHome size={16} />,
  'Ocean View': <IoWater size={16} />,
  'High End Luxury': <MdOutlineVilla size={16} />,
  'Jungle View': <GiPalmTree size={16} />,
  'Land Plots': <GiIsland size={16} />,
  'Private Pool': <IoWater size={16} />,
};

const BuyResultDisplay = () => {
  const [selectedSort, setSelectedSort] = useState<SortOption>('recommended');
  const [visibleProperties, setVisibleProperties] = useState(6); // Initially show 6 properties
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

  // Total number of available properties
  const totalProperties = properties.length;
  const remainingProperties = totalProperties - visibleProperties;

  const toggleFavorite = (id: number) => {
    setIsFavorite((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log(`Toggled favorite for property ${id}`);
  };

  const handleShowMore = () => {
    // Show more properties each time
    setVisibleProperties((prev) => Math.min(prev + 4, totalProperties));
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'LIND Society - Property Results',
          text: 'Check out these amazing properties I found on LIND Society!',
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

  // Sort properties based on selected option
  const sortedProperties = [...properties].sort((a, b) => {
    switch (selectedSort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        // For demo, just reverse the order to simulate "newest"
        return b.id - a.id;
      default:
        return 0; // Keep original order for recommended
    }
  });

  return (
    <div className='bg-gray-50 py-4 md:py-8'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8 w-full'>
          {/* Top bar - Responsive layout */}
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 w-full'>
            <span className='text-gray-500 font-medium order-2 sm:order-1'>
              Available properties: <strong>{totalProperties}</strong>
            </span>
            <div className='flex gap-3 md:gap-6 items-center order-1 sm:order-2'>
              {/* Mobile filter button */}
              {/* <Button
                variant='outline'
                className='flex gap-2 items-center md:hidden'
              >
                <SlidersHorizontal size={18} className='text-primary' />
                <span className='text-primary'>Filters</span>
              </Button> */}

              {/* Desktop filter button */}
              {/* <Button
                variant='outline'
                className='hidden md:flex gap-2 items-center'
                onClick={() => console.log('Desktop filters clicked')}
              >
                <SlidersHorizontal size={18} className='text-primary' />
                <span className='text-primary'>Filters</span>
              </Button> */}

              {/* Map toggle button */}
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
                    <MapView properties={properties} />
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
      <div className={`w-full py-6 ${showMap ? 'bg-white' : ''}`}>
        <BaseContainer>
          {/* Property grid with optional map layout */}
          {showMap ? (
            <div className='flex flex-col lg:flex-row w-full gap-0 lg:gap-4'>
              {/* Cards section - Takes 2/3 of the width on desktop with map */}
              <div className='w-full lg:w-2/3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
                  {sortedProperties
                    .slice(0, visibleProperties)
                    .map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={{
                          ...property,
                          isFavorite: !!isFavorite[property.id],
                          tagIcons: tagIcons,
                        }}
                        onFavoriteToggle={() => toggleFavorite(property.id)}
                      />
                    ))}
                </div>

                {/* Show more button inside the cards section */}
                {remainingProperties > 0 && (
                  <div className='flex justify-center my-4'>
                    <Button
                      variant='ghost'
                      className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
                      onClick={handleShowMore}
                    >
                      Show more properties ({remainingProperties})
                    </Button>
                  </div>
                )}
              </div>

              {/* Map section - Takes 1/3 of the width on desktop */}
              <div className='hidden lg:block lg:w-1/3 h-screen sticky top-0 p-4 pr-0'>
                <MapView properties={properties} />
              </div>
            </div>
          ) : (
            /* Regular grid layout when map is hidden */
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
              {sortedProperties.slice(0, visibleProperties).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={{
                    ...property,
                    isFavorite: !!isFavorite[property.id],
                    tagIcons: tagIcons,
                  }}
                  onFavoriteToggle={() => toggleFavorite(property.id)}
                />
              ))}

              {/* Show more button below the grid */}
              {remainingProperties > 0 && (
                <div className='col-span-full flex justify-center mt-2 md:mt-4'>
                  <Button
                    variant='ghost'
                    className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
                    onClick={handleShowMore}
                  >
                    Show more properties ({remainingProperties})
                  </Button>
                </div>
              )}
            </div>
          )}
        </BaseContainer>
      </div>
    </div>
  );
};

export default BuyResultDisplay;
