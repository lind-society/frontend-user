import React from 'react';
import { PiStarFill } from 'react-icons/pi';

import { cn } from '@/lib/utils';

/** Five stars, filled up to the (rounded) rating. */
export const Stars = ({
  rating,
  size = 16,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) => {
  const filled = Math.round(Math.max(0, Math.min(5, rating)));

  return (
    <div
      className={cn('flex gap-1', className)}
      role='img'
      aria-label={`${rating} / 5`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <PiStarFill
          key={index}
          size={size}
          className={index < filled ? 'text-primary' : 'text-bronze/25'}
        />
      ))}
    </div>
  );
};
