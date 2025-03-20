'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  formatOptions?: Intl.NumberFormatOptions;
  onChange?: (values: [number, number]) => void;
  className?: string;
}

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

// Helper function to format numbers with thousand separators
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Helper function to parse formatted number strings back to numbers
export const parseFormattedNumber = (value: string): number => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/[^\d]/g, '');
  return cleanValue ? parseInt(cleanValue, 10) : 0;
};

const PriceRangeSlider = ({
  min,
  max,
  step = 1000,
  formatOptions = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
  onChange,
  className,
}: PriceRangeSliderProps) => {
  const [values, setValues] = React.useState<[number, number]>([min, max]);
  const [inputMin, setInputMin] = React.useState<string>(formatNumber(min));
  const [inputMax, setInputMax] = React.useState<string>(formatNumber(max));

  const handleSliderChange = (newValues: number[]) => {
    const newRange = [newValues[0], newValues[1]] as [number, number];
    setValues(newRange);
    setInputMin(formatNumber(newRange[0]));
    setInputMax(formatNumber(newRange[1]));
    onChange?.(newRange);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow user to type without formatting while typing
    const rawValue = e.target.value;
    setInputMin(rawValue);

    // Parse the input value without formatting
    const numValue = parseFormattedNumber(rawValue);

    // Update the slider if the value is valid
    if (numValue >= min && numValue <= values[1]) {
      setValues([numValue, values[1]]);
      onChange?.([numValue, values[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow user to type without formatting while typing
    const rawValue = e.target.value;
    setInputMax(rawValue);

    // Parse the input value without formatting
    const numValue = parseFormattedNumber(rawValue);

    // Update the slider if the value is valid
    if (numValue <= max && numValue >= values[0]) {
      setValues([values[0], numValue]);
      onChange?.([values[0], numValue]);
    }
  };

  const handleMinInputBlur = () => {
    // Get numerical value from input
    const numValue = parseFormattedNumber(inputMin);

    // Handle edge cases and apply formatting
    if (numValue < min) {
      setInputMin(formatNumber(min));
      setValues([min, values[1]]);
      onChange?.([min, values[1]]);
    } else if (numValue > values[1]) {
      setInputMin(formatNumber(values[1]));
      setValues([values[1], values[1]]);
      onChange?.([values[1], values[1]]);
    } else {
      // Format the valid input
      setInputMin(formatNumber(numValue));
      setValues([numValue, values[1]]);
      onChange?.([numValue, values[1]]);
    }
  };

  const handleMaxInputBlur = () => {
    // Get numerical value from input
    const numValue = parseFormattedNumber(inputMax);

    // Handle edge cases and apply formatting
    if (numValue > max) {
      setInputMax(formatNumber(max));
      setValues([values[0], max]);
      onChange?.([values[0], max]);
    } else if (numValue < values[0]) {
      setInputMax(formatNumber(values[0]));
      setValues([values[0], values[0]]);
      onChange?.([values[0], values[0]]);
    } else {
      // Format the valid input
      setInputMax(formatNumber(numValue));
      setValues([values[0], numValue]);
      onChange?.([values[0], numValue]);
    }
  };

  // Handle option clicks - With formatting
  const handleRangeOptionClick = (minValue: number, maxValue: number) => {
    setValues([minValue, maxValue]);
    setInputMin(formatNumber(minValue));
    setInputMax(formatNumber(maxValue));
    onChange?.([minValue, maxValue]);
  };

  // Price range options
  const priceRangeOptions = [
    {
      id: 'range-1',
      label: `Up to ${formatCurrency(250000, formatOptions)}`,
      onClick: () => handleRangeOptionClick(min, 250000),
    },
    {
      id: 'range-2',
      label: `${formatCurrency(250000, formatOptions)} - ${formatCurrency(
        500000,
        formatOptions
      )}`,
      onClick: () => handleRangeOptionClick(250000, 500000),
    },
    {
      id: 'range-3',
      label: `${formatCurrency(500000, formatOptions)} - ${formatCurrency(
        750000,
        formatOptions
      )}`,
      onClick: () => handleRangeOptionClick(500000, 750000),
    },
    {
      id: 'range-4',
      label: `${formatCurrency(750000, formatOptions)} - ${formatCurrency(
        1000000,
        formatOptions
      )}`,
      onClick: () => handleRangeOptionClick(750000, 1000000),
    },
    {
      id: 'range-5',
      label: `${formatCurrency(1000000, formatOptions)} - ${formatCurrency(
        1500000,
        formatOptions
      )}`,
      onClick: () => handleRangeOptionClick(1000000, 1500000),
    },
  ];

  return (
    <div className={`space-y-5 ${className}`}>
      {/* Current price range display - Better visibility */}
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

      {/* Input fields - Responsive layout with formatted values */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
        <div className='flex flex-col gap-2'>
          <Label className='text-gray-500 text-sm'>Minimum Price</Label>
          <Input
            type='text' // Changed from 'number' to 'text' to support formatting
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
            type='text' // Changed from 'number' to 'text' to support formatting
            value={inputMax}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            placeholder='Max price'
            className='focus-visible:ring-primary'
          />
        </div>
      </div>

      {/* Price range quick options - Using flex-wrap for responsive behavior */}
      <div className='pt-2'>
        <div className='flex items-center gap-2 overflow-x-auto flex-wrap py-2 px-1'>
          {priceRangeOptions.map((option) => (
            <Button
              key={option.id}
              variant='outline'
              onClick={option.onClick}
              className='whitespace-nowrap text-sm mb-2'
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PriceRangeSlider };
