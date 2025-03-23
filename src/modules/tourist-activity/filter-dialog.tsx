import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Define expected filter data interface
interface FilterData {
  country: string;
  cities: string[];
}

interface FilterDialogTouristProps {
  onApplyFilters?: (filterData: FilterData) => void;
}

const FilterDialogTourist = ({ onApplyFilters }: FilterDialogTouristProps) => {
  // Dialog state
  const [open, setOpen] = useState(false);

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
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex gap-2 items-center'>
          <SlidersHorizontal size={20} className='text-primary' />
          <span className='text-primary'>Filters</span>
          {getSelectedCitiesCount() > 0 && (
            <span className='bg-primary text-white rounded-full text-xs py-0.5 px-2 ml-1'>
              {getSelectedCitiesCount()}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0 xl:max-w-[60vw] overflow-hidden'>
        <DialogTitle className='hidden'>
          <p>Filters</p>
        </DialogTitle>

        <div className='flex'>
          {/* Country selection sidebar */}
          <div className='flex flex-col'>
            {countries.map((country) => (
              <div
                key={country}
                className={`px-5 py-3 flex justify-between w-[240px] cursor-pointer ${
                  activeCountry === country
                    ? 'bg-primary text-white'
                    : 'text-primary'
                }`}
                onClick={() => handleCountryClick(country)}
              >
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold'>{country}</span>
                  <span className='text-xs'>
                    Explore activity based on city
                  </span>
                </div>
                <ChevronRight
                  className={
                    activeCountry === country ? 'text-white' : 'text-primary'
                  }
                />
              </div>
            ))}
          </div>

          {/* City selection area */}
          <div className='flex flex-col flex-1'>
            <div className='p-5 border-b flex flex-col gap-2'>
              <span className='font-semibold text-primary'>
                {activeCountry}
              </span>
              <div className='flex flex-wrap gap-3'>
                {citiesByCountry[activeCountry]?.map((city) => (
                  <Button
                    key={city}
                    variant={selectedCities[city] ? 'primary' : 'outline'}
                    className={
                      selectedCities[city] ? 'text-white' : 'text-primary'
                    }
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
                  Filter activities by city destination
                </span>
                <span className='text-xs text-gray-500'>
                  {getSelectedCitiesCount()}{' '}
                  {getSelectedCitiesCount() === 1 ? 'city' : 'cities'} selected
                </span>
              </div>
              <Button
                variant='ghost'
                className='text-text text-sm'
                onClick={clearCities}
              >
                Clear
              </Button>
            </div>

            {/* Action buttons */}
            <div className='mt-auto border-t p-5 flex justify-between'>
              <Button variant='ghost' onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant='primary' onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialogTourist;
