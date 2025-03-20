'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { OptionCarousel } from '@/modules/rent/header/option-carousel';

// Helper functions for formatting and parsing numbers
export const formatCurrency = (
  value: number,
  options: Intl.NumberFormatOptions = {}
) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export const parseFormattedNumber = (value: string): number => {
  const cleanValue = value.replace(/[^\d]/g, '');
  return cleanValue ? parseInt(cleanValue, 10) : 0;
};

interface PriceRangeProps {
  values: [number, number];
  onValueChange: (values: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  values,
  onValueChange,
  min = 0,
  max = 5000000, // Higher max for property purchase
  step = 10000,
}) => {
  const [inputMin, setInputMin] = React.useState<string>(
    formatNumber(values[0])
  );
  const [inputMax, setInputMax] = React.useState<string>(
    formatNumber(values[1])
  );

  const handleSliderChange = (newValues: number[]) => {
    const newRange = [newValues[0], newValues[1]] as [number, number];
    onValueChange(newRange);
    setInputMin(formatNumber(newRange[0]));
    setInputMax(formatNumber(newRange[1]));
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputMin(rawValue);

    const numValue = parseFormattedNumber(rawValue);
    if (numValue >= min && numValue <= values[1]) {
      onValueChange([numValue, values[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputMax(rawValue);

    const numValue = parseFormattedNumber(rawValue);
    if (numValue <= max && numValue >= values[0]) {
      onValueChange([values[0], numValue]);
    }
  };

  const handleMinInputBlur = () => {
    const numValue = parseFormattedNumber(inputMin);

    if (numValue < min) {
      setInputMin(formatNumber(min));
      onValueChange([min, values[1]]);
    } else if (numValue > values[1]) {
      setInputMin(formatNumber(values[1]));
      onValueChange([values[1], values[1]]);
    } else {
      setInputMin(formatNumber(numValue));
      onValueChange([numValue, values[1]]);
    }
  };

  const handleMaxInputBlur = () => {
    const numValue = parseFormattedNumber(inputMax);

    if (numValue > max) {
      setInputMax(formatNumber(max));
      onValueChange([values[0], max]);
    } else if (numValue < values[0]) {
      setInputMax(formatNumber(values[0]));
      onValueChange([values[0], values[0]]);
    } else {
      setInputMax(formatNumber(numValue));
      onValueChange([values[0], numValue]);
    }
  };

  const formatOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  // Price range options - adjusted for property purchases
  const priceRangeOptions = [
    {
      label: `Up to ${formatCurrency(500000, formatOptions)}`,
      onClick: () => handleSliderChange([min, 500000]),
    },
    {
      label: `${formatCurrency(500000, formatOptions)} - ${formatCurrency(
        1000000,
        formatOptions
      )}`,
      onClick: () => handleSliderChange([500000, 1000000]),
    },
    {
      label: `${formatCurrency(1000000, formatOptions)} - ${formatCurrency(
        2000000,
        formatOptions
      )}`,
      onClick: () => handleSliderChange([1000000, 2000000]),
    },
    {
      label: `${formatCurrency(2000000, formatOptions)} - ${formatCurrency(
        5000000,
        formatOptions
      )}`,
      onClick: () => handleSliderChange([2000000, 5000000]),
    },
    {
      label: `Above ${formatCurrency(5000000, formatOptions)}`,
      onClick: () => handleSliderChange([5000000, max]),
    },
  ];

  return (
    <div className='flex flex-col gap-5'>
      <span className='text-lg md:text-[22px] font-semibold text-primary'>
        Price Range
      </span>

      {/* Price range quick options */}
      <OptionCarousel>
        <div className='flex gap-3'>
          {priceRangeOptions.map((option, index) => (
            <Button
              key={index}
              variant='outline'
              size='sm'
              onClick={option.onClick}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </OptionCarousel>

      {/* Current price display and slider */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='md:col-span-1 flex flex-col gap-2'>
          <div className='text-center text-sm font-medium text-gray-600'>
            {formatCurrency(values[0], formatOptions)} -{' '}
            {formatCurrency(values[1], formatOptions)}
          </div>

          {/* Slider */}
          <div className='pt-2 px-2 flex justify-center'>
            <SliderPrimitive.Root
              className='relative flex w-full touch-none select-none items-center'
              value={values}
              min={min}
              max={max}
              step={step}
              onValueChange={handleSliderChange}
            >
              <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200'>
                <SliderPrimitive.Range className='absolute h-full bg-primary' />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-white bg-primary shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
              <SliderPrimitive.Thumb className='block h-5 w-5 rounded-full border-2 border-white bg-primary shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50' />
            </SliderPrimitive.Root>
          </div>
        </div>

        {/* Input fields */}
        <div className='grid grid-cols-2 gap-3 md:gap-4'>
          <div className='flex flex-col gap-2'>
            <Label className='text-gray-500 text-sm'>Minimum Price</Label>
            <Input
              type='text'
              value={inputMin}
              onChange={handleMinInputChange}
              onBlur={handleMinInputBlur}
              placeholder='Min price'
              className='focus-visible:ring-primary'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label className='text-gray-500 text-sm'>Maximum Price</Label>
            <Input
              type='text'
              value={inputMax}
              onChange={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              placeholder='Max price'
              className='focus-visible:ring-primary'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
