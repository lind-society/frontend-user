'use client';

import { ChevronUp, SlidersHorizontal, X } from 'lucide-react';
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
  onApply?: () => void;
  onClear?: () => void;
}

export function FiltersDialog({ onApply, onClear }: FiltersProps) {
  const [open, setOpen] = useState(false);
  const [, setPriceRange] = useState<[number, number]>([0, 1500000]);

  const handleApply = () => {
    onApply?.();
    setOpen(false);
  };

  const handleClear = () => {
    onClear?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex gap-2 items-center'>
          <SlidersHorizontal size={20} className='text-primary' />
          <span className='text-primary'>Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[90vw]  p-0 h-[80vh] flex flex-col max-h-[80vh]'>
        <div className='flex px-4 md:px-8 py-4 md:py-5 justify-between border-b sticky top-0 bg-white z-10'>
          <DialogTitle>
            <div className='flex gap-2 items-center'>
              <SlidersHorizontal size={24} className='text-primary' />
              <span className='text-primary text-xl md:text-2xl'>Filters</span>
            </div>
          </DialogTitle>
          <Button variant='ghost' size='icon' onClick={() => setOpen(false)}>
            <X size={20} className='text-gray-500' />
          </Button>
        </div>

        <ScrollArea className='flex-1 overflow-y-auto '>
          <div className='flex flex-col gap-4'>
            {/* Price Range Section */}
            <div className='flex flex-col px-4 md:px-8 py-4 gap-5 border-b'>
              <span className='text-primary text-lg md:text-[22px] font-semibold'>
                Price Range
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
                <span className='text-lg font-semibold text-gray-800'>
                  Collections
                </span>
                <ChevronUp className='text-gray-500' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {[
                  'Beachfront',
                  'Mountain View',
                  'Historic',
                  'Modern',
                  'Luxury',
                  'Budget-friendly',
                ].map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 py-1.5'
                  >
                    <Checkbox id={`collection-${index}`} />
                    <label
                      htmlFor={`collection-${index}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700'
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant='link' className='text-primary self-start p-0'>
                Show more
              </Button>
            </div>

            {/* Freebies Section */}
            <div className='px-4 md:px-8 py-4 border-b flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span className='text-lg font-semibold text-gray-800'>
                  Freebies
                </span>
                <ChevronUp className='text-gray-500' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {[
                  'Free breakfast',
                  'Free parking',
                  'Free wifi',
                  'Free cancellation',
                  'Free airport shuttle',
                ].map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 py-1.5'
                  >
                    <Checkbox id={`freebie-${index}`} />
                    <label
                      htmlFor={`freebie-${index}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700'
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className='px-4 md:px-8 pb-10 pt-4 border-b flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span className='text-lg font-semibold text-gray-800'>
                  Amenities
                </span>
                <ChevronUp className='text-gray-500' />
              </div>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {[
                  'Air conditioning',
                  'Pool',
                  'Kitchen',
                  'Parking',
                  'Gym',
                  'Jacuzzi',
                  'Beach access',
                  'BBQ',
                  'Laundry',
                ].map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-2 py-1.5'
                  >
                    <Checkbox id={`amenity-${index}`} />
                    <label
                      htmlFor={`amenity-${index}`}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700'
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
              <Button variant='link' className='text-primary self-start p-0'>
                Show more
              </Button>
            </div>
          </div>
        </ScrollArea>

        <div className='border-t px-4 md:px-8 py-4 flex justify-between absolute w-full bottom-0 bg-white'>
          <Button
            variant='ghost'
            onClick={handleClear}
            className='text-sm font-medium text-gray-700'
          >
            Clear All
          </Button>
          <Button variant='primary' onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
