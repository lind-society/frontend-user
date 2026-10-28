'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type TextTabOption<T extends string> = {
  value: T;
  label: string;
};

/**
 * Underlined text tabs used across the redesign for lightweight filters
 * ("For Rent | For Sale", "Daily | Monthly | Yearly"). Options are separated by
 * hairline rules rather than sitting in buttons.
 */
export function TextTabs<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly TextTabOption<T>[];
  value: T;
  onChange: (next: T) => void;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center', className)}>
      {options.map((option, index) => (
        <React.Fragment key={option.value}>
          {index > 0 && (
            <span aria-hidden className='mx-4 h-4 w-px bg-bronze/40' />
          )}
          <button
            type='button'
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              'whitespace-nowrap border-b-2 pb-1 text-sm transition-colors md:text-base',
              value === option.value
                ? 'border-bronze text-bronze-600'
                : 'border-transparent text-ink-soft hover:text-ink'
            )}
          >
            {option.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
