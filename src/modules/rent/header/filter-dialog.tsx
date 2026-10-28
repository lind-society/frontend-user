/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ChevronUp, SlidersHorizontal, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

import { PriceRangeSlider } from '@/modules/rent/header/price-range';

interface FiltersProps {
  onApply?: (filterData: any) => void;
  onClear?: () => void;
}

export function FiltersDialog({ onApply, onClear }: FiltersProps) {
  const t = useTranslations('filters');
  const [open, setOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]);

  // Filter states
  const [collections, setCollections] = useState<Record<string, boolean>>({});
  const [freebies, setFreebies] = useState<Record<string, boolean>>({});
  const [amenities, setAmenities] = useState<Record<string, boolean>>({});

  // Collections data with translations
  const collectionsData = [
    { key: 'beachfront', label: t('collectionsOptions.beachfront') },
    { key: 'mountainView', label: t('collectionsOptions.mountainView') },
    { key: 'historic', label: t('collectionsOptions.historic') },
    { key: 'modern', label: t('collectionsOptions.modern') },
    { key: 'luxury', label: t('collectionsOptions.luxury') },
    { key: 'budgetFriendly', label: t('collectionsOptions.budgetFriendly') },
  ];

  // Freebies data with translations
  const freebiesData = [
    { key: 'freeBreakfast', label: t('freebiesOptions.freeBreakfast') },
    { key: 'freeParking', label: t('freebiesOptions.freeParking') },
    { key: 'freeWifi', label: t('freebiesOptions.freeWifi') },
    { key: 'freeCancellation', label: t('freebiesOptions.freeCancellation') },
    {
      key: 'freeAirportShuttle',
      label: t('freebiesOptions.freeAirportShuttle'),
    },
  ];

  // Amenities data with translations
  const amenitiesData = [
    { key: 'airConditioning', label: t('amenitiesOptions.airConditioning') },
    { key: 'pool', label: t('amenitiesOptions.pool') },
    { key: 'kitchen', label: t('amenitiesOptions.kitchen') },
    { key: 'parking', label: t('amenitiesOptions.parking') },
    { key: 'gym', label: t('amenitiesOptions.gym') },
    { key: 'jacuzzi', label: t('amenitiesOptions.jacuzzi') },
    { key: 'beachAccess', label: t('amenitiesOptions.beachAccess') },
    { key: 'bbq', label: t('amenitiesOptions.bbq') },
    { key: 'laundry', label: t('amenitiesOptions.laundry') },
  ];

  // Toggle checkbox selection
  const toggleCollection = (key: string) => {
    setCollections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleFreebie = (key: string) => {
    setFreebies((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleAmenity = (key: string) => {
    setAmenities((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Handle apply filters
  const handleApply = () => {
    // Collect all selected filters
    const selectedFilters = {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      collections: Object.entries(collections)
        .filter(([_, selected]) => selected)
        .map(([name]) => name),
      freebies: Object.entries(freebies)
        .filter(([_, selected]) => selected)
        .map(([name]) => name),
      amenities: Object.entries(amenities)
        .filter(([_, selected]) => selected)
        .map(([name]) => name),
    };

    // Pass filter data to parent component
    if (onApply) {
      onApply(selectedFilters);
    }

    setOpen(false);
  };

  // Handle clear filters
  const handleClear = () => {
    setPriceRange([0, 1500000]);
    setCollections({});
    setFreebies({});
    setAmenities({});

    if (onClear) {
      onClear();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          className='flex items-center gap-2 text-cream hover:text-bronze-200'
        >
          <SlidersHorizontal size={18} />
          <span>{t('title')}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[90vw]  p-0 h-[80vh] flex flex-col max-h-[80vh]'>
        <div className='flex px-4 md:px-8 py-4 md:py-5 justify-between border-b sticky top-0 bg-cream-light z-10'>
          <DialogTitle>
            <div className='flex gap-2 items-center'>
              <SlidersHorizontal size={24} className='text-primary' />
              <span className='text-primary text-xl md:text-2xl'>
                {t('title')}
              </span>
            </div>
          </DialogTitle>
          <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
            <X size={20} className='text-ink-muted' />
          </Button>
        </div>

        <ScrollArea className='flex-1 overflow-y-auto '>
          <div className='flex flex-col gap-4'>
            {/* Price Range Section */}
            <div className='flex flex-col px-4 md:px-8 py-4 gap-5 border-b'>
              <span className='text-primary text-lg md:text-[22px] font-semibold'>
                {t('priceRange')}
              </span>
              <PriceRangeSlider
                min={0}
                max={1500000}
                step={1000}
                onChange={(values) => setPriceRange(values)}
              />
            </div>

            {/* Collections Section */}
            <div className='px-4 md:px-8 py-4 border-b flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span className='text-lg font-semibold text-ink'>
                  {t('collections')}
                </span>
                <ChevronUp className='text-ink-muted' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {collectionsData.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 py-1.5'
                  >
                    <Checkbox
                      id={`collection-${index}`}
                      checked={collections[item.key] || false}
                      onCheckedChange={() => toggleCollection(item.key)}
                    />
                    <label
                      htmlFor={`collection-${index}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-ink-soft'
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant='link' className='text-primary self-start p-0'>
                {t('showMore')}
              </Button>
            </div>

            {/* Freebies Section */}
            <div className='px-4 md:px-8 py-4 border-b flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span className='text-lg font-semibold text-ink'>
                  {t('freebies')}
                </span>
                <ChevronUp className='text-ink-muted' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {freebiesData.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 py-1.5'
                  >
                    <Checkbox
                      id={`freebie-${index}`}
                      checked={freebies[item.key] || false}
                      onCheckedChange={() => toggleFreebie(item.key)}
                    />
                    <label
                      htmlFor={`freebie-${index}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-ink-soft'
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className='px-4 md:px-8 pb-10 pt-4 border-b flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span className='text-lg font-semibold text-ink'>
                  {t('amenities')}
                </span>
                <ChevronUp className='text-ink-muted' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {amenitiesData.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 py-1.5'
                  >
                    <Checkbox
                      id={`amenity-${index}`}
                      checked={amenities[item.key] || false}
                      onCheckedChange={() => toggleAmenity(item.key)}
                    />
                    <label
                      htmlFor={`amenity-${index}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-ink-soft'
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant='link' className='text-primary self-start p-0'>
                {t('showMore')}
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className='border-t px-4 md:px-8 py-4 flex justify-between absolute w-full bottom-0 bg-cream-light'>
          <Button
            variant='ghost'
            onClick={handleClear}
            className='text-sm font-medium text-ink-soft'
          >
            {t('clearAll')}
          </Button>
          <Button variant='primary' onClick={handleApply}>
            {t('applyFilters')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
