'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Bronze outline pill used for amenity / preference filters. Reads the same on
 * the dark hero panel and the cream results bar, so one variant covers both.
 */
export const AmenityChip = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: React.ReactNode;
    isActive?: boolean;
  }
>(({ icon, isActive = false, className, children, ...props }, ref) => (
  <button
    ref={ref}
    type='button'
    aria-pressed={isActive}
    className={cn(
      'flex min-w-max items-center gap-2 rounded-sm border px-4 py-2.5 text-sm transition-colors',
      isActive
        ? 'border-bronze-600 bg-bronze-600 text-white'
        : 'border-bronze/55 bg-transparent text-bronze-600 hover:bg-bronze/10',
      className
    )}
    {...props}
  >
    {icon && <span className='shrink-0'>{icon}</span>}
    <span className='whitespace-nowrap'>{children}</span>
  </button>
));
AmenityChip.displayName = 'AmenityChip';
