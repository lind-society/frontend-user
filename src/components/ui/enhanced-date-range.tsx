'use client';

import { addMonths, addYears, format, isAfter, startOfToday } from 'date-fns';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type DurationType = 'daily' | 'monthly' | 'yearly';
type DateRange = { from: Date | undefined; to?: Date | undefined };
/** Which end of the range the next calendar click sets (daily tab only). */
type ActiveField = 'checkIn' | 'checkOut';

interface EnhancedDateRangePickerProps {
  onRangeChange: (range: DateRange, durationType: DurationType) => void;
  initialRange?: DateRange;
  initialDurationType?: DurationType;
  namespace?: string; // Allow custom translation namespace
  /**
   * Render custom trigger markup instead of the built-in field. Callers render
   * a single field showing the whole range: splitting the search bar into
   * separate "Check in" / "Check out" buttons only duplicated the entry point,
   * since both opened the same panel.
   */
  renderTrigger?: (helpers: {
    /** Pass straight to the field's `onClick`. */
    open: (event?: React.MouseEvent<HTMLElement>) => void;
    dateRange: DateRange;
    durationType: DurationType;
  }) => React.ReactNode;
}

/** Stay lengths offered on the Monthly / Yearly tabs. */
const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6];

const addDuration = (
  from: Date,
  durationType: DurationType,
  value: number
): Date =>
  durationType === 'yearly' ? addYears(from, value) : addMonths(from, value);

/**
 * Brand-palette day picker: month name on the left, both chevrons grouped on
 * the right, uppercase weekday initials, bronze fill on the selected days and a
 * soft bronze tint across the nights in between.
 */
const calendarClassNames = {
  // stack the two months on phones instead of forcing them side by side
  months: 'flex flex-col gap-6 sm:flex-row sm:gap-8',
  month: 'space-y-3',
  caption: 'flex items-center justify-between px-1 pt-1 relative',
  caption_label: 'text-sm font-medium text-ink',
  nav: 'flex items-center gap-1',
  nav_button:
    'h-7 w-7 rounded border border-bronze/30 bg-transparent p-0 text-ink-soft opacity-70 hover:opacity-100 hover:bg-bronze/10 disabled:opacity-25',
  nav_button_previous: '',
  nav_button_next: '',
  table: 'w-full border-collapse',
  head_row: 'flex',
  head_cell:
    'w-9 font-normal text-[0.65rem] uppercase tracking-wide text-ink-muted',
  row: 'flex w-full mt-1',
  cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r [&:has([aria-selected].day-outside)]:bg-bronze-100/60 [&:has([aria-selected])]:bg-bronze-100 first:[&:has([aria-selected])]:rounded-l last:[&:has([aria-selected])]:rounded-r focus-within:relative focus-within:z-20',
  day: 'h-9 w-9 p-0 font-normal text-sm rounded hover:bg-bronze/15 aria-selected:opacity-100',
  day_selected:
    'bg-bronze-600 text-white hover:bg-bronze-600 hover:text-white focus:bg-bronze-600 focus:text-white',
  day_today: 'border border-bronze/40',
  day_range_middle: 'aria-selected:bg-bronze-100 aria-selected:text-ink',
  day_outside: 'text-ink-muted opacity-60',
  day_disabled: 'text-ink-muted opacity-35',
};

/** "SUN", "MON", … to match the design instead of day-picker's "Su", "Mo". */
const calendarFormatters = {
  formatWeekdayName: (day: Date) => format(day, 'EEE').toUpperCase(),
};

export const EnhancedDateRangePicker: React.FC<
  EnhancedDateRangePickerProps
> = ({
  onRangeChange,
  initialRange = { from: undefined, to: undefined },
  initialDurationType = 'daily',
  namespace = 'landingPage.search.enhancedDateRange', // Default to landing page namespace
  renderTrigger,
}) => {
  const t = useTranslations(namespace);
  const today = startOfToday();

  // `committed` is what the search bar shows and what the parent was told
  // about; `draft` is what the open panel is editing. Keeping them apart is
  // what makes Cancel actually cancel — and it is why switching tabs is safe:
  // recomputing the check-out only touches the draft and reaches the search
  // once Apply is pressed.
  const [committed, setCommitted] = useState<DateRange>(initialRange);
  const [committedDurationType, setCommittedDurationType] =
    useState<DurationType>(initialDurationType);
  const [draft, setDraft] = useState<DateRange>(initialRange);
  const [durationType, setDurationType] =
    useState<DurationType>(initialDurationType);
  const [durationValue, setDurationValue] = useState(1);

  const [activeField, setActiveField] = useState<ActiveField>('checkIn');
  const [isOpen, setIsOpen] = useState(false);

  // Radix measures the anchor element to place the popover. A `display:
  // contents` wrapper has no layout box and reports an all-zero rect, which
  // used to pin the calendar to the top-left corner of the viewport instead of
  // under the field — so anchor to the trigger element itself.
  const anchorFieldRef = React.useRef<HTMLElement | null>(null);
  // Radix wants a ref that always resolves to something measurable, so keep a
  // stable object that forwards to the field currently in play.
  const anchorRef = React.useRef({
    getBoundingClientRect: () =>
      anchorFieldRef.current?.getBoundingClientRect() ?? new DOMRect(),
  });

  const open = (event?: React.MouseEvent<HTMLElement>) => {
    if (event?.currentTarget) {
      anchorFieldRef.current = event.currentTarget;
    }

    // always start from what is actually applied, never from a stale draft
    setDraft(committed);
    setDurationType(committedDurationType);
    setDurationValue(1);
    setActiveField('checkIn');
    setIsOpen(true);
  };

  const getDisplayText = () => {
    if (!committed.from) {
      return t('selectDates');
    }

    return committed.to
      ? `${format(committed.from, 'dd MMM yyyy')} - ${format(
          committed.to,
          'dd MMM yyyy'
        )}`
      : `${format(committed.from, 'dd MMM yyyy')} - ${t('selectEndDate')}`;
  };

  /**
   * Daily tab. Sequential selection, the way every booking site behaves: first
   * click sets check-in, second closes the range, and a click on or before
   * check-in starts a fresh range instead of erroring. Driven off the clicked
   * day rather than the range react-day-picker computes, because its own range
   * logic is what made editing feel random.
   */
  const handleDaySelect = (
    _range: DateRange | undefined,
    selectedDay: Date | undefined
  ) => {
    if (!selectedDay) return;

    if (activeField === 'checkIn') {
      setDraft((current) => ({
        from: selectedDay,
        // keep an existing check-out only if it still sits after the new date
        to:
          current.to && isAfter(current.to, selectedDay)
            ? current.to
            : undefined,
      }));
      setActiveField('checkOut');
      return;
    }

    if (!draft.from || !isAfter(selectedDay, draft.from)) {
      // clicked on or before check-in — read it as "I meant to start here"
      setDraft({ from: selectedDay, to: undefined });
      setActiveField('checkOut');
      return;
    }

    setDraft({ from: draft.from, to: selectedDay });
    // range complete; the next click starts over from a new check-in
    setActiveField('checkIn');
  };

  /** Monthly / yearly tabs: the calendar only picks the starting date. */
  const handleStartDateSelect = (selectedDay: Date | undefined) => {
    if (!selectedDay) return;

    setDraft({
      from: selectedDay,
      to: addDuration(selectedDay, durationType, durationValue),
    });
  };

  const handleDurationTypeChange = (value: string) => {
    const next = value as DurationType;

    setDurationType(next);
    setDurationValue(1);
    setActiveField('checkIn');

    if (next === 'daily') {
      // a date range is still a valid date range — leave the user's dates alone
      return;
    }

    if (draft.from) {
      setDraft({ from: draft.from, to: addDuration(draft.from, next, 1) });
    }
  };

  const handleDurationValueChange = (value: number) => {
    setDurationValue(value);

    const from = draft.from ?? today;
    setDraft({ from, to: addDuration(from, durationType, value) });
  };

  const commit = () => {
    if (!draft.from || !draft.to) return;

    setCommitted(draft);
    setCommittedDurationType(durationType);
    onRangeChange(draft, durationType);
    setIsOpen(false);
  };

  /** "How long do you want to stay?" + starting date, shared by both tabs. */
  const renderDurationPanel = (mode: 'monthly' | 'yearly') => (
    <div className='grid gap-6 p-4 md:grid-cols-2 md:items-center'>
      <div className='space-y-4 text-center'>
        <div>
          <h4 className='text-base font-medium text-ink'>{t('howLongStay')}</h4>
          <p className='mt-1 text-sm text-bronze-600'>
            {mode === 'monthly'
              ? t('monthCount', { count: durationValue })
              : t('yearCount', { count: durationValue })}
          </p>
        </div>

        <div className='grid grid-cols-6 gap-2'>
          {DURATION_OPTIONS.map((value) => (
            <button
              key={value}
              type='button'
              onClick={() => handleDurationValueChange(value)}
              aria-pressed={durationValue === value}
              className={cn(
                'rounded border py-2 text-sm transition-colors',
                durationValue === value
                  ? 'border-bronze-600 bg-bronze-600 text-white'
                  : 'border-bronze/30 text-ink hover:bg-bronze/10'
              )}
            >
              {value}
            </button>
          ))}
        </div>

        <p className='text-sm text-ink-muted'>
          {t('startingDateAt')}{' '}
          <span className='font-medium text-bronze-600'>
            {draft.from ? format(draft.from, 'dd MMMM yyyy') : t('selectDate')}
          </span>
        </p>
      </div>

      <Calendar
        mode='single'
        selected={draft.from}
        onSelect={handleStartDateSelect}
        defaultMonth={draft.from ?? today}
        disabled={{ before: today }}
        classNames={calendarClassNames}
        formatters={calendarFormatters}
        className='p-0'
      />
    </div>
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      {renderTrigger ? (
        <>
          <PopoverAnchor virtualRef={anchorRef} />
          {renderTrigger({
            open,
            dateRange: committed,
            durationType: committedDurationType,
          })}
        </>
      ) : (
        <PopoverTrigger asChild>
          <button
            onClick={() => {
              setDraft(committed);
              setDurationType(committedDurationType);
              setDurationValue(1);
              setActiveField('checkIn');
            }}
            className='flex w-full gap-2 rounded border border-transparent px-3 py-2 hover:border-bronze/30 md:w-auto'
          >
            <FaCalendar size={24} className='text-bronze-600' />
            <div className='flex w-full flex-col'>
              <span className='text-left font-semibold'>{t('label')}</span>
              <div className='flex items-center justify-between'>
                <span className='truncate pr-2 text-ink-soft'>
                  {getDisplayText()}
                </span>
                <ChevronDown
                  size={18}
                  className='flex-shrink-0 text-bronze-600'
                />
              </div>
            </div>
          </button>
        </PopoverTrigger>
      )}
      <PopoverContent
        className='max-h-[85vh] w-auto max-w-[calc(100vw-2rem)] overflow-y-auto p-0'
        align='start'
        sideOffset={8}
        collisionPadding={16}
      >
        <Tabs value={durationType} onValueChange={handleDurationTypeChange}>
          <div className='p-3 pb-0'>
            <TabsList className='grid h-auto w-full grid-cols-3 gap-1 rounded border-b-0 bg-sand/50 p-1'>
              <TabsTrigger
                value='daily'
                className='rounded border-b-0 py-2 text-sm data-[state=active]:bg-bronze-600 data-[state=active]:text-white'
              >
                {t('daily')}
              </TabsTrigger>
              <TabsTrigger
                value='monthly'
                className='rounded border-b-0 py-2 text-sm data-[state=active]:bg-bronze-600 data-[state=active]:text-white'
              >
                {t('monthly')}
              </TabsTrigger>
              <TabsTrigger
                value='yearly'
                className='rounded border-b-0 py-2 text-sm data-[state=active]:bg-bronze-600 data-[state=active]:text-white'
              >
                {t('yearly')}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='daily' className='mt-0'>
            <Calendar
              mode='range'
              selected={draft}
              onSelect={handleDaySelect}
              numberOfMonths={2}
              defaultMonth={draft.from ?? today}
              disabled={{ before: today }}
              classNames={calendarClassNames}
              formatters={calendarFormatters}
            />
          </TabsContent>

          <TabsContent value='monthly' className='mt-0'>
            {renderDurationPanel('monthly')}
          </TabsContent>

          <TabsContent value='yearly' className='mt-0'>
            {renderDurationPanel('yearly')}
          </TabsContent>
        </Tabs>

        <div className='flex justify-end gap-2 border-t border-bronze/20 p-3'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsOpen(false)}
            className='text-xs'
          >
            {t('cancel')}
          </Button>
          <Button
            variant='primary'
            size='sm'
            onClick={commit}
            disabled={!draft.from || !draft.to}
            className='text-xs'
          >
            {t('apply')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
