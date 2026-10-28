import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * LIND Society wordmark.
 *
 * The artwork ships as a transparent PNG, so we paint it with a CSS mask
 * instead of an <img>. That lets the mark inherit `currentColor` — the new
 * design needs it in ink on the cream chrome and in cream over hero imagery,
 * and this keeps both from a single asset with no colour drift.
 */

type LogoProps = React.HTMLAttributes<HTMLSpanElement> & {
  /** Drop the "LIND SOCIETY" wordmark and render only the droplet mark. */
  markOnly?: boolean;
};

const Logo = ({ className, markOnly = false, ...props }: LogoProps) => {
  const src = markOnly ? '/images/logo-without-text.png' : '/images/logo.png';

  return (
    <span
      role='img'
      aria-label='LIND Society'
      className={cn(
        'inline-block bg-current',
        markOnly ? 'aspect-[198/240]' : 'aspect-[612/332]',
        className
      )}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      {...props}
    />
  );
};

export default Logo;
