import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-bronze/30 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-bronze focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-bronze-600 text-white hover:bg-bronze-700',
        secondary: 'border-transparent bg-sand/50 text-ink hover:bg-sand/50/80',
        destructive:
          'border-transparent bg-red-500 text-cream hover:bg-red-500/80',
        outline: 'text-ink',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
