'use client';

import { ChevronRight, SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define expected filter data interface
interface FilterData {
  country: string;
  cities: string[];
}

interface FilterDialogTouristProps {
  onApplyFilters?: (filterData: FilterData) => void;
}

const FilterDialogTourist = ({ onApplyFilters }: FilterDialogTouristProps) => {
  const t = useTranslations('filters.touristActivity');

  // Dialog state
  const [open, setOpen] = useState(false);

  // Mobile navigation state
  const [showCities, setShowCities] = useState(false);

  // Filter states
  const [activeCountry, setActiveCountry] = useState<string>('Indonesia');
  const [selectedCities, setSelectedCities] = useState<Record<string, boolean>>(
    {}
  );

  // Define available countries and cities
  const countries = ['Indonesia', 'Japan', 'Thailand'] as const;

  const citiesByCountry: Record<string, string[]> = {
    Indonesia: ['Bali', 'Jakarta', 'Yogyakarta', 'Bandung', 'Bogor'],
    Japan: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido', 'Okinawa'],
    Thailand: ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi'],
  };

  // Handle country selection
  const handleCountryClick = (country: string) => {
    setActiveCountry(country);
    // On mobile, navigate to cities view when a country is selected
    if (window.innerWidth < 768) {
      setShowCities(true);
    }
  };

  // Navigate back to countries on mobile
  const handleBackToCountries = () => {
    setShowCities(false);
  };

  // Toggle city selection
  const toggleCity = (city: string) => {
    setSelectedCities((prev) => ({
      ...prev,
      [city]: !prev[city],
    }));
  };

  // Get number of selected cities
  const getSelectedCitiesCount = () => {
    return Object.values(selectedCities).filter(Boolean).length;
  };

  // Clear all selected cities
  const clearCities = () => {
    setSelectedCities({});
  };

  // Apply filters and close dialog
  const applyFilters = () => {
    const selectedCitiesList = Object.entries(selectedCities)
      .filter(([_, selected]) => selected)
      .map(([city]) => city);

    const filterData: FilterData = {
      country: activeCountry,
      cities: selectedCitiesList,
    };

    if (onApplyFilters) {
      onApplyFilters(filterData);
    }

    setOpen(false);
    // Reset mobile navigation state
    setShowCities(false);
  };

  // Reset mobile view when dialog closes
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setShowCities(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex gap-2 items-center'>
          <SlidersHorizontal size={20} className='text-primary' />
          <span className='text-primary'>{t('title').split(' ')[0]}</span>
          {getSelectedCitiesCount() > 0 && (
            <span className='bg-primary text-white rounded-full text-xs py-0.5 px-2 ml-1'>
              {getSelectedCitiesCount()}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className='p-0 md:max-w-[90vw] lg:max-w-[80vw] xl:max-w-[60vw] h-[90vh] md:h-auto max-h-[90vh] overflow-hidden'>
        {/* Mobile header */}
        <DialogHeader className='md:hidden px-4 py-3 border-b'>
          <div className='flex items-center justify-start'>
            <Button
              variant='ghost'
              size='icon'
              className={showCities ? 'visible' : 'hidden'}
              onClick={handleBackToCountries}
            >
              <ChevronRight className='rotate-180 text-primary' />
            </Button>
            <DialogTitle className='text-center text-primary font-semibold'>
              {showCities ? activeCountry : t('selectCountry')}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Desktop header - hidden on mobile */}
        <DialogHeader className='hidden md:flex px-6 py-4 border-b'>
          <div className='flex items-center justify-between w-full'>
            <DialogTitle className='text-xl font-semibold text-primary'>
              {t('title')}
            </DialogTitle>
            <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
              <X className='text-gray-500' />
            </Button>
          </div>
        </DialogHeader>

        <div className='flex flex-col md:flex-row h-full overflow-hidden'>
          {/* Country selection - Only shown on desktop or on mobile when not showing cities */}
          <div
            className={`md:w-[240px] md:border-r md:flex-shrink-0 md:block ${
              showCities ? 'hidden' : 'block'
            }`}
          >
            <ScrollArea className='h-full max-h-[calc(90vh-120px)] md:max-h-[60vh]'>
              {countries.map((country) => (
                <div
                  key={country}
                  className={`px-5 py-3 flex justify-between cursor-pointer ${
                    activeCountry === country
                      ? 'bg-primary text-white'
                      : 'text-primary hover:bg-gray-50'
                  }`}
                  onClick={() => handleCountryClick(country)}
                >
                  <div className='flex flex-col gap-1'>
                    <span className='font-semibold'>{country}</span>
                    <span className='text-xs'>
                      {t('exploreActivityBasedOnCity')}
                    </span>
                  </div>
                  <ChevronRight
                    className={
                      activeCountry === country ? 'text-white' : 'text-primary'
                    }
                  />
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* City selection area - Only shown on desktop or on mobile when showing cities */}
          <div
            className={`flex-1 flex flex-col md:block ${
              showCities ? 'block' : 'hidden md:block'
            }`}
          >
            <ScrollArea className='flex-grow max-h-[calc(90vh-180px)] md:max-h-[calc(60vh-60px)]'>
              <div className='p-5 border-b flex flex-col gap-2'>
                <span className='font-semibold text-primary hidden md:block'>
                  {activeCountry}
                </span>
                <div className='flex flex-wrap gap-3'>
                  {citiesByCountry[activeCountry]?.map((city) => (
                    <Button
                      key={city}
                      variant={selectedCities[city] ? 'primary' : 'outline'}
                      className={`
                        ${selectedCities[city] ? 'text-white' : 'text-primary'}
                        md:text-sm text-xs px-3 py-1 h-auto
                      `}
                      onClick={() => toggleCity(city)}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
              <div className='p-5 flex justify-between'>
                <div className='flex flex-col gap-1'>
                  <span className='text-primary font-semibold text-sm'>
                    {t('filterActivitiesByCity')}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {getSelectedCitiesCount()}{' '}
                    {getSelectedCitiesCount() === 1
                      ? t('citySelected')
                      : t('citiesSelected')}
                  </span>
                </div>
                <Button
                  variant='ghost'
                  className='text-text text-sm'
                  onClick={clearCities}
                >
                  {t('clear')}
                </Button>
              </div>
            </ScrollArea>

            {/* Action buttons - Fixed to bottom */}
            <div className='border-t p-4 md:p-5 flex justify-between mt-auto sticky bottom-0 bg-white'>
              <Button
                variant='ghost'
                onClick={() => {
                  // On mobile, go back to countries view instead of closing on Cancel
                  if (showCities && window.innerWidth < 768) {
                    setShowCities(false);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {showCities && window.innerWidth < 768
                  ? t('back')
                  : t('cancel')}
              </Button>
              <Button variant='primary' onClick={applyFilters}>
                {t('../applyFilters')}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialogTourist;
