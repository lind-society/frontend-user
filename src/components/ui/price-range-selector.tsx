'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Define price range option type
export interface PriceRangeOption {
  id: string;
  label: string;
  minValue: number;
  maxValue: number | null; // null for "no upper limit"
}

// Default price range options
export const DEFAULT_PRICE_RANGES: PriceRangeOption[] = [
  {
    id: 'any',
    label: 'Any Price',
    minValue: 0,
    maxValue: null,
  },
  {
    id: 'under-500k',
    label: 'Under $500,000',
    minValue: 0,
    maxValue: 500000,
  },
  {
    id: '500k-1m',
    label: '$500,000 - $1M',
    minValue: 500000,
    maxValue: 1000000,
  },
  {
    id: '1m-2m',
    label: '$1M - $2M',
    minValue: 1000000,
    maxValue: 2000000,
  },
  {
    id: '2m-5m',
    label: '$2M - $5M',
    minValue: 2000000,
    maxValue: 5000000,
  },
  {
    id: '5m-plus',
    label: '$5M+',
    minValue: 5000000,
    maxValue: null,
  },
];

// Component props
interface PriceRangeSelectorProps {
  initialMinPrice?: number;
  initialMaxPrice?: number | null;
  absoluteMin?: number;
  absoluteMax?: number;
  step?: number;
  onChange?: (minPrice: number, maxPrice: number | null) => void;
  priceRanges?: PriceRangeOption[];
  className?: string;
}

// Helper function to format price with abbreviations
export const formatPrice = (price: number | null): string => {
  if (price === null) return 'Any';

  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
  } else if (price >= 1000) {
    return `$${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
  } else {
    return `$${price}`;
  }
};

// Helper function to format with thousand separators
export const formatNumberWithCommas = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

// Helper function to parse formatted strings back to numbers
export const parseFormattedNumber = (value: string): number => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/[^\d]/g, '');
  return cleanValue ? parseInt(cleanValue, 10) : 0;
};

export const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  initialMinPrice = 0,
  initialMaxPrice = null,
  absoluteMin = 0,
  absoluteMax = 10000000, // 10M default max
  step = 10000,
  onChange,
  priceRanges = DEFAULT_PRICE_RANGES,
  className = '',
}) => {
  const t = useTranslations('inputComponents.priceRange');
  // Find initial selected range option based on initialMinPrice and initialMaxPrice
  const findInitialSelectedOption = (): string => {
    const matchingOption = priceRanges.find(
      (option) =>
        option.minValue === initialMinPrice &&
        option.maxValue === initialMaxPrice
    );
    return matchingOption?.id || '';
  };

  // State for values
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    findInitialSelectedOption
  );
  const [minPrice, setMinPrice] = useState<number>(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState<number | null>(initialMaxPrice);
  const [sliderValues, setSliderValues] = useState<[number, number]>([
    initialMinPrice,
    initialMaxPrice === null ? absoluteMax : initialMaxPrice,
  ]);
  const [minInputValue, setMinInputValue] = useState<string>(
    formatNumberWithCommas(initialMinPrice)
  );
  const [maxInputValue, setMaxInputValue] = useState<string>(
    initialMaxPrice === null ? 'Any' : formatNumberWithCommas(initialMaxPrice)
  );

  // Handle range badge click
  const handleRangeOptionClick = (option: PriceRangeOption) => {
    setSelectedOptionId(option.id);
    setMinPrice(option.minValue);
    setMaxPrice(option.maxValue);

    // Update slider values
    setSliderValues([
      option.minValue,
      option.maxValue === null ? absoluteMax : option.maxValue,
    ]);

    // Update input fields
    setMinInputValue(formatNumberWithCommas(option.minValue));
    setMaxInputValue(
      option.maxValue === null ? 'Any' : formatNumberWithCommas(option.maxValue)
    );

    // Trigger onChange callback
    if (onChange) {
      onChange(option.minValue, option.maxValue);
    }
  };

  // Handle slider change
  const handleSliderChange = (newValues: number[]) => {
    const newMinValue = newValues[0];
    const newMaxValue = newValues[1];

    setSliderValues([newMinValue, newMaxValue]);
    setMinPrice(newMinValue);
    setMaxPrice(newMaxValue === absoluteMax ? null : newMaxValue);

    // Update input fields
    setMinInputValue(formatNumberWithCommas(newMinValue));
    setMaxInputValue(
      newMaxValue === absoluteMax ? 'Any' : formatNumberWithCommas(newMaxValue)
    );

    // Clear selected option if the values don't match any predefined option
    setSelectedOptionId('');

    // Find if the new values match any predefined option
    const matchingOption = priceRanges.find(
      (option) =>
        option.minValue === newMinValue &&
        ((option.maxValue === null && newMaxValue === absoluteMax) ||
          option.maxValue === newMaxValue)
    );

    if (matchingOption) {
      setSelectedOptionId(matchingOption.id);
    }

    // Trigger onChange callback
    if (onChange) {
      onChange(newMinValue, newMaxValue === absoluteMax ? null : newMaxValue);
    }
  };

  // Handle min input change
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMinInputValue(inputValue);

    // Only update other values when input is valid
    const numValue = parseFormattedNumber(inputValue);
    if (numValue >= absoluteMin && numValue <= (maxPrice || absoluteMax)) {
      setMinPrice(numValue);
      setSliderValues([numValue, sliderValues[1]]);

      // Clear selected option
      setSelectedOptionId('');

      // Find if the new values match any predefined option
      const matchingOption = priceRanges.find(
        (option) =>
          option.minValue === numValue &&
          ((option.maxValue === null && maxPrice === null) ||
            option.maxValue === maxPrice)
      );

      if (matchingOption) {
        setSelectedOptionId(matchingOption.id);
      }

      // Trigger onChange callback
      if (onChange) {
        onChange(numValue, maxPrice);
      }
    }
  };

  // Handle max input change
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMaxInputValue(inputValue);

    // If "Any" is entered, set maxPrice to null
    if (inputValue.toLowerCase() === 'any') {
      setMaxPrice(null);
      setSliderValues([minPrice, absoluteMax]);

      // Find if the new values match any predefined option
      const matchingOption = priceRanges.find(
        (option) => option.minValue === minPrice && option.maxValue === null
      );

      if (matchingOption) {
        setSelectedOptionId(matchingOption.id);
      } else {
        setSelectedOptionId('');
      }

      // Trigger onChange callback
      if (onChange) {
        onChange(minPrice, null);
      }
      return;
    }

    // Only update other values when input is valid
    const numValue = parseFormattedNumber(inputValue);
    if (numValue >= minPrice && numValue <= absoluteMax) {
      setMaxPrice(numValue);
      setSliderValues([sliderValues[0], numValue]);

      // Clear selected option
      setSelectedOptionId('');

      // Find if the new values match any predefined option
      const matchingOption = priceRanges.find(
        (option) => option.minValue === minPrice && option.maxValue === numValue
      );

      if (matchingOption) {
        setSelectedOptionId(matchingOption.id);
      }

      // Trigger onChange callback
      if (onChange) {
        onChange(minPrice, numValue);
      }
    }
  };

  // Handle input blur - format the value properly
  const handleMinInputBlur = () => {
    const numValue = parseFormattedNumber(minInputValue);

    // Handle edge cases
    if (numValue < absoluteMin) {
      setMinPrice(absoluteMin);
      setMinInputValue(formatNumberWithCommas(absoluteMin));
      setSliderValues([absoluteMin, sliderValues[1]]);
    } else if (numValue > (maxPrice || absoluteMax)) {
      setMinPrice(maxPrice || absoluteMax);
      setMinInputValue(formatNumberWithCommas(maxPrice || absoluteMax));
      setSliderValues([maxPrice || absoluteMax, sliderValues[1]]);
    } else {
      // Format the valid input
      setMinInputValue(formatNumberWithCommas(numValue));
    }
  };

  // Handle input blur - format the value properly
  const handleMaxInputBlur = () => {
    if (maxInputValue.toLowerCase() === 'any') {
      setMaxPrice(null);
      setMaxInputValue('Any');
      setSliderValues([sliderValues[0], absoluteMax]);
      return;
    }

    const numValue = parseFormattedNumber(maxInputValue);

    // Handle edge cases
    if (numValue > absoluteMax) {
      setMaxPrice(absoluteMax);
      setMaxInputValue(formatNumberWithCommas(absoluteMax));
      setSliderValues([sliderValues[0], absoluteMax]);
    } else if (numValue < minPrice) {
      setMaxPrice(minPrice);
      setMaxInputValue(formatNumberWithCommas(minPrice));
      setSliderValues([sliderValues[0], minPrice]);
    } else {
      // Format the valid input
      setMaxInputValue(formatNumberWithCommas(numValue));
    }
  };

  // Format the current range for display
  const getCurrentRangeText = (): string => {
    if (maxPrice === null) {
      return `${formatPrice(minPrice)}+`;
    } else {
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current price range display */}

      {/* Price range quick options */}
      <div className='flex flex-wrap gap-2'>
        {priceRanges.map((option) => (
          <Button
            key={option.id}
            variant={selectedOptionId === option.id ? 'default' : 'outline'}
            size='sm'
            onClick={() => handleRangeOptionClick(option)}
            className={`text-xs whitespace-nowrap ${
              selectedOptionId === option.id
                ? 'bg-primary text-white'
                : 'text-gray-700'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <div className='text-center text-sm font-medium text-gray-600'>
        {getCurrentRangeText()}
      </div>
      {/* Slider */}
      <div className='pt-2 px-2 flex justify-center'>
        <SliderPrimitive.Root
          className='relative flex w-full touch-none select-none items-center'
          value={sliderValues}
          min={absoluteMin}
          max={absoluteMax}
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

      {/* Input fields */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <Label className='text-gray-500 text-sm'>{t('minimumPrice')}</Label>
          <Input
            type='text'
            value={minInputValue}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            placeholder={t('minPrice')}
            className='focus-visible:ring-primary'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='text-gray-500 text-sm'>{t('maximumPrice')}</Label>
          <Input
            type='text'
            value={maxInputValue}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            placeholder={t('maxPriceOrAny')}
            className='focus-visible:ring-primary'
          />
        </div>
      </div>
    </div>
  );
};
