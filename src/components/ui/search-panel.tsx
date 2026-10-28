'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * The dark booking bar shared by the landing hero, the Rent/Buy hero and the
 * results pages. The new design draws it as a near-black panel outlined in
 * bronze, with hairline dividers between fields rather than boxed inputs.
 */

export const SearchPanel = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded border border-bronze/60 bg-ink px-4 py-4 text-cream sm:px-6 sm:py-5',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const SearchTabs = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    role='tablist'
    className={cn(
      'flex gap-6 overflow-x-auto border-b border-bronze/35 sm:gap-10',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const SearchTab = ({
  isActive,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) => (
  <button
    type='button'
    role='tab'
    aria-selected={isActive}
    className={cn(
      '-mb-px whitespace-nowrap border-b-2 pb-3 text-base transition-colors',
      isActive
        ? 'border-bronze text-bronze'
        : 'border-transparent text-cream/80 hover:text-cream',
      className
    )}
    {...props}
  >
    {children}
  </button>
);

/** Row of fields separated by the vertical bronze hairlines from the design. */
export const SearchFieldRow = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col divide-y divide-bronze/30 lg:flex-row lg:items-stretch lg:divide-x lg:divide-y-0',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

type SearchFieldProps = {
  icon?: React.ElementType;
  label: string;
  value: React.ReactNode;
  /** Hide the chevron for fields that are not a dropdown trigger. */
  hasChevron?: boolean;
  className?: string;
};

/**
 * A single labelled field. Rendered as a plain element so callers can wrap it
 * in a Popover/Dialog trigger with `asChild`.
 */
export const SearchField = React.forwardRef<
  HTMLButtonElement,
  SearchFieldProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    { icon: Icon, label, value, hasChevron = true, className, ...props },
    ref
  ) => (
    <button
      ref={ref}
      type='button'
      className={cn(
        'flex flex-1 flex-col gap-1 px-1 py-3 text-left transition-colors hover:bg-cream/5 lg:px-6 lg:py-2',
        className
      )}
      {...props}
    >
      <span className='flex items-center gap-2 text-sm text-bronze-300'>
        {Icon && <Icon size={16} className='shrink-0 text-bronze' />}
        {label}
      </span>
      <span className='flex items-center justify-between gap-2 text-base text-cream'>
        <span className='truncate'>{value}</span>
        {hasChevron && (
          <ChevronDown size={16} className='shrink-0 text-cream/70' />
        )}
      </span>
    </button>
  )
);
SearchField.displayName = 'SearchField';

/** Minus/plus counter used inside the bedrooms, bathrooms and guests popovers. */
export const SearchStepper = ({
  description,
  value,
  min,
  max,
  onChange,
}: {
  description: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}) => (
  <div className='flex flex-col gap-3'>
    <span className='text-sm text-ink-soft'>{description}</span>
    <div className='flex items-center justify-between'>
      <button
        type='button'
        onClick={() => onChange(Math.max(min, value - 1))}
        className='flex h-8 w-8 items-center justify-center rounded-full border border-bronze/40 text-bronze disabled:opacity-40'
        disabled={value <= min}
      >
        -
      </button>
      <span className='font-semibold'>{value.toString().padStart(2, '0')}</span>
      <button
        type='button'
        onClick={() => onChange(Math.min(max, value + 1))}
        className='flex h-8 w-8 items-center justify-center rounded-full border border-bronze/40 text-bronze disabled:opacity-40'
        disabled={value >= max}
      >
        +
      </button>
    </div>
  </div>
);

/** Bronze "Exclusive Early Bird Offers" strip beneath the field row. */
export const PromoStrip = ({
  message,
  linkLabel,
  href,
  className,
}: {
  message: string;
  linkLabel: string;
  href: string;
  className?: string;
}) => (
  <div
    className={cn(
      'flex flex-col gap-1 rounded-sm bg-bronze-600 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-4',
      className
    )}
  >
    <p className='font-heading text-sm sm:text-base'>{message}</p>
    <Link
      href={href}
      className='whitespace-nowrap text-sm underline underline-offset-4 hover:no-underline sm:text-base'
    >
      {linkLabel}
    </Link>
  </div>
);
