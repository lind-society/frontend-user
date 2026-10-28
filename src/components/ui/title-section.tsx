import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils';

type TitleSectionProps = {
  title: string;
  subTitle?: string;
  isCarousel?: boolean;
  link?: string;
  description?: string;
  isDepthAlign?: boolean;
  /** Label for the CTA beside the heading. Required whenever `link` is set. */
  linkLabel?: string;
  /**
   * `center` is the new design's default for full-width sections; `start`
   * keeps the heading left with the CTA pushed to the opposite edge.
   */
  align?: 'center' | 'start';
};

const TitleSection = ({
  title,
  subTitle,
  link,
  linkLabel,
  description,
  align = 'center',
}: TitleSectionProps) => {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex gap-y-3',
        isCenter
          ? 'flex-col items-center text-center'
          : 'flex-col justify-between gap-x-8 sm:flex-row sm:items-end'
      )}
    >
      <div className={cn('flex flex-col gap-2', isCenter && 'items-center')}>
        <h2 className='text-ink'>{title}</h2>
        {subTitle && (
          <p className='max-w-2xl text-ink-soft md:text-lg'>{subTitle}</p>
        )}
        {description && (
          <p className='max-w-2xl text-ink-soft md:text-lg'>{description}</p>
        )}
      </div>

      {link && (
        <Link
          href={link}
          className='inline-flex shrink-0 items-center gap-1.5 text-sm text-bronze-600 underline-offset-4 transition-colors hover:text-bronze-600 hover:underline'
        >
          <span>{linkLabel ?? 'View All'}</span>
          <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
};

export default TitleSection;
