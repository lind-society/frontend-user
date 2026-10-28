import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-bone disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group',
  {
    variants: {
      variant: {
        default: 'bg-ink text-cream hover:bg-ink/90',
        destructive: 'bg-danger text-cream hover:bg-danger/90',
        outline:
          'border border-bronze/40 bg-transparent text-ink hover:bg-bronze/10 hover:border-bronze',
        secondary: 'bg-sand text-ink hover:bg-sand/70',
        ghost: 'text-ink hover:bg-bronze/10 hover:text-bronze-600',
        link: 'text-bronze-600 underline-offset-4 hover:underline',
        'no-bg': 'text-ink',
        primary:
          'bg-bronze-600 text-white border border-bronze-600 hover:bg-bronze-700 hover:border-bronze-700',
        'primary-outline':
          'text-bronze-600 border border-bronze bg-transparent hover:bg-bronze-600 hover:text-white',
        /* solid bronze CTA with the uppercase tracking used for FIND HOMES etc. */
        cta: 'bg-bronze-600 text-white uppercase tracking-[0.08em] font-medium hover:bg-bronze-700',
        /* light chip button sitting on cream surfaces (Show map, Share result) */
        soft: 'bg-cream text-bronze-600 border border-bronze/40 hover:bg-bronze-600 hover:text-white',
        'primary-red':
          'text-cream bg-primary-red hover:bg-secondary-red border border-transparent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded px-3',
        lg: 'h-11 rounded px-8',
        xl: 'h-12 rounded px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
