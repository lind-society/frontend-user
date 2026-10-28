import { AlertCircle, SearchX } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Shared empty / error placeholder for list pages. Previously each page printed
 * a bare red sentence, which read as a broken page rather than a state.
 */
export const StateMessage = ({
  variant = 'empty',
  title,
  description,
  action,
  className,
}: {
  variant?: 'empty' | 'error';
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) => {
  const Icon = variant === 'error' ? AlertCircle : SearchX;

  return (
    <div
      role={variant === 'error' ? 'alert' : undefined}
      className={cn(
        'flex flex-col items-center gap-3 rounded border border-bronze/20 bg-cream px-6 py-14 text-center',
        className
      )}
    >
      <Icon
        size={34}
        strokeWidth={1.25}
        className={variant === 'error' ? 'text-danger' : 'text-bronze-600'}
        aria-hidden
      />
      <p className='font-heading text-xl font-semibold text-ink'>{title}</p>
      {description && (
        <p className='max-w-md text-sm text-ink-soft'>{description}</p>
      )}
      {action && <div className='mt-2'>{action}</div>}
    </div>
  );
};
