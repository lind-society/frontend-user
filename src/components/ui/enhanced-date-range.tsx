'use client';

import { addMonths, addYears, format } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type DurationType = 'daily' | 'monthly' | 'yearly';
type DateRange = { from: Date | undefined; to?: Date | undefined };

interface EnhancedDateRangePickerProps {
  onRangeChange: (range: DateRange, durationType: DurationType) => void;
  initialRange?: DateRange;
  initialDurationType?: DurationType;
}

export const EnhancedDateRangePicker: React.FC<
  EnhancedDateRangePickerProps
> = ({
  onRangeChange,
  initialRange = { from: undefined, to: undefined },
  initialDurationType = 'daily',
}) => {
  const [dateRange, setDateRange] = useState<DateRange>(initialRange);
  const [durationType, setDurationType] =
    useState<DurationType>(initialDurationType);
  const [durationValue, setDurationValue] = useState<number>(1);
  const [isOpen, setIsOpen] = useState(false);

  // Get formatted display dates
  const getDisplayText = () => {
    if (!dateRange.from) {
      return 'Select dates';
    }

    if (durationType === 'daily') {
      return dateRange.to
        ? `${format(dateRange.from, 'dd MMM yyyy')} - ${format(
            dateRange.to,
            'dd MMM yyyy'
          )}`
        : `${format(dateRange.from, 'dd MMM yyyy')} - Select end date`;
    } else {
      // Calculate the projected end date based on start date and duration
      const endDate =
        durationType === 'monthly'
          ? addMonths(dateRange.from, durationValue)
          : addYears(dateRange.from, durationValue);

      return `${format(dateRange.from, 'dd MMM yyyy')} - ${format(
        endDate,
        'dd MMM yyyy'
      )}`;
    }
  };

  // Handle daily date range selection - fixed to handle DateRange properly
  const handleDailyRangeSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
      onRangeChange(range, 'daily');
    }
  };

  // Handle duration type change
  const handleDurationTypeChange = (value: string) => {
    const newDurationType = value as DurationType;
    setDurationType(newDurationType);

    // Reset duration value when switching types
    setDurationValue(1);

    // Update the end date based on new duration type and value
    if (dateRange.from) {
      const newEndDate =
        newDurationType === 'monthly'
          ? addMonths(dateRange.from, 1)
          : addYears(dateRange.from, 1);

      const newRange = { from: dateRange.from, to: newEndDate };
      setDateRange(newRange);
      onRangeChange(newRange, newDurationType);
    }
  };

  // Handle duration value change
  const handleDurationValueChange = (value: number) => {
    setDurationValue(value);

    if (dateRange.from) {
      const newEndDate =
        durationType === 'monthly'
          ? addMonths(dateRange.from, value)
          : addYears(dateRange.from, value);

      const newRange = { from: dateRange.from, to: newEndDate };
      setDateRange(newRange);
      onRangeChange(newRange, durationType);
    }
  };

  // Handle start date selection for monthly/yearly
  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const endDate =
      durationType === 'monthly'
        ? addMonths(date, durationValue)
        : addYears(date, durationValue);

    const newRange = { from: date, to: endDate };
    setDateRange(newRange);
    onRangeChange(newRange, durationType);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className='py-2 px-3 flex gap-2 w-full md:w-auto border border-transparent hover:border-gray-200 rounded-md'>
          <FaCalendar size={24} className='text-primary' />
          <div className='flex flex-col w-full'>
            <span className='font-semibold text-left'>
              Check in - Check out
            </span>
            <div className='flex justify-between items-center'>
              <span className='text-gray-500 truncate pr-2'>
                {getDisplayText()}
              </span>
              <ChevronDown size={18} className='text-primary flex-shrink-0' />
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Tabs
          value={durationType}
          onValueChange={handleDurationTypeChange}
          className='w-full'
        >
          <div className='px-3 pt-3'>
            <TabsList className='w-full grid grid-cols-3'>
              <TabsTrigger value='daily' className='text-xs'>
                Daily
              </TabsTrigger>
              <TabsTrigger value='monthly' className='text-xs'>
                Monthly
              </TabsTrigger>
              <TabsTrigger value='yearly' className='text-xs'>
                Yearly
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Daily tab content - Range calendar */}
          <TabsContent value='daily' className='mt-1'>
            <Calendar
              mode='range'
              selected={dateRange}
              onSelect={handleDailyRangeSelect}
              numberOfMonths={2}
              classNames={{
                months: 'flex space-x-4',
                month: 'space-y-3',
                caption:
                  'flex justify-center pt-1 relative items-center text-xs',
                caption_label: 'text-xs font-medium',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell:
                  'text-neutral-500 rounded-md w-8 font-normal text-[0.7rem]',
                row: 'flex w-full mt-1',
                cell: 'h-8 w-8 text-center text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected])]:bg-neutral-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: 'h-8 w-8 p-0 font-normal text-xs aria-selected:opacity-100',
                day_selected:
                  'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
                day_today: 'bg-neutral-100 text-neutral-900',
                day_range_middle:
                  'aria-selected:bg-neutral-100/90 aria-selected:text-neutral-900',
              }}
            />
          </TabsContent>

          {/* Monthly tab content - Duration selector + start date calendar */}
          <TabsContent value='monthly' className='mt-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-3'>
              <div className='space-y-3'>
                <div className='text-center'>
                  <h4 className='font-medium mb-2 text-sm'>
                    How long do you want to stay?
                  </h4>
                  <div className='grid grid-cols-3 xl:grid-cols-6 gap-2'>
                    {[1, 2, 3, 4, 5, 6].map((value) => (
                      <button
                        key={value}
                        className={`py-1.5 px-3 rounded-md border text-center text-xs ${
                          durationValue === value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => handleDurationValueChange(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='space-y-2'>
                  <h5 className='font-medium text-sm'>Stay duration</h5>
                  <div className='p-2 border rounded-md bg-tertiary/30 text-xs'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-xs text-gray-500'>Duration:</span>
                      <span className='font-medium'>
                        {durationValue}{' '}
                        {durationValue === 1 ? 'month' : 'months'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-xs text-gray-500'>Start date:</span>
                      <span className='font-medium'>
                        {dateRange.from
                          ? format(dateRange.from, 'dd MMM yyyy')
                          : 'Select date'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-xs text-gray-500'>End date:</span>
                      <span className='font-medium'>
                        {dateRange.from
                          ? format(
                              addMonths(dateRange.from, durationValue),
                              'dd MMM yyyy'
                            )
                          : 'Select start date first'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='border-l pl-4'>
                <h4 className='font-medium mb-2 text-sm'>Select start date</h4>
                <Calendar
                  mode='single'
                  selected={dateRange.from}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  classNames={{
                    caption:
                      'flex justify-center pt-1 relative items-center text-xs',
                    caption_label: 'text-xs font-medium',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex',
                    head_cell:
                      'text-neutral-500 rounded-md w-8 font-normal text-[0.7rem]',
                    row: 'flex w-full mt-1',
                    cell: 'h-8 w-8 text-center text-xs p-0 relative',
                    day: 'h-8 w-8 p-0 font-normal text-xs aria-selected:opacity-100',
                    day_selected:
                      'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
                    day_today: 'bg-neutral-100 text-neutral-900',
                  }}
                />
              </div>
            </div>
          </TabsContent>

          {/* Yearly tab content - Similar to monthly but with years */}
          <TabsContent value='yearly' className='mt-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-3'>
              <div className='space-y-3'>
                <div>
                  <h4 className='font-medium mb-2 text-sm'>
                    How long do you want to stay?
                  </h4>
                  <div className='grid grid-cols-3 gap-2'>
                    {[1, 2, 3, 4, 5, 6].map((value) => (
                      <button
                        key={value}
                        className={`py-1.5 px-3 rounded-md border text-center text-xs ${
                          durationValue === value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white hover:bg-gray-50 border-gray-200'
                        }`}
                        onClick={() => handleDurationValueChange(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='space-y-2'>
                  <h4 className='font-medium text-sm'>Stay duration</h4>
                  <div className='p-2 border rounded-md bg-tertiary/30 text-xs'>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-xs text-gray-500'>Duration:</span>
                      <span className='font-medium'>
                        {durationValue} {durationValue === 1 ? 'year' : 'years'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-xs text-gray-500'>Start date:</span>
                      <span className='font-medium'>
                        {dateRange.from
                          ? format(dateRange.from, 'dd MMM yyyy')
                          : 'Select date'}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <span className='text-xs text-gray-500'>End date:</span>
                      <span className='font-medium'>
                        {dateRange.from
                          ? format(
                              addYears(dateRange.from, durationValue),
                              'dd MMM yyyy'
                            )
                          : 'Select start date first'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='border-l pl-4'>
                <h4 className='font-medium mb-2 text-sm'>Select start date</h4>
                <Calendar
                  mode='single'
                  selected={dateRange.from}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  classNames={{
                    caption:
                      'flex justify-center pt-1 relative items-center text-xs',
                    caption_label: 'text-xs font-medium',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex',
                    head_cell:
                      'text-neutral-500 rounded-md w-8 font-normal text-[0.7rem]',
                    row: 'flex w-full mt-1',
                    cell: 'h-8 w-8 text-center text-xs p-0 relative',
                    day: 'h-8 w-8 p-0 font-normal text-xs aria-selected:opacity-100',
                    day_selected:
                      'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
                    day_today: 'bg-neutral-100 text-neutral-900',
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className='flex justify-end gap-2 p-2 border-t'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsOpen(false)}
            className='text-xs'
          >
            Cancel
          </Button>
          <Button
            variant='primary'
            size='sm'
            onClick={() => setIsOpen(false)}
            disabled={!dateRange.from}
            className='text-xs'
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
