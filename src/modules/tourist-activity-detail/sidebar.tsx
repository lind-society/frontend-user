'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { toTouristActivity } from '@/lib/mappers/activity';
import { useActivities } from '@/hooks/api/useActivity';

import { Button } from '@/components/ui/button';

import { TouristActivity } from '@/modules/tourist-activity/constant';

interface SidebarProps {
  activity: TouristActivity;
  onGetTicket: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activity, onGetTicket }) => {
  const t = useTranslations('touristActivityDetail');
  const hasDiscount = activity.originalPrice
    ? activity.originalPrice > activity.price
    : false;

  // No "related activities" endpoint exists — just surface one other real
  // activity rather than a hardcoded "Tari Kecak" card that showed on every
  // single activity regardless of what it actually was.
  const { data } = useActivities({ limit: 5 });
  const moreActivity = (data?.data.data ?? [])
    .map(toTouristActivity)
    .find((item) => item.id !== activity.id);

  return (
    <aside className='w-full lg:w-80 flex-shrink-0'>
      <div className='bg-cream-light rounded shadow-sm border border-bronze/25 p-4 mb-6'>
        <div className='text-sm text-ink-muted mb-1'>{t('startFrom')}</div>
        <div className='text-2xl font-bold text-primary mb-1'>
          {activity.currency} {activity.price.toLocaleString()}
          <span className='text-base font-normal text-ink-muted'>
            /{activity.priceUnit}
          </span>
        </div>
        {hasDiscount && activity.originalPrice && (
          <div className='text-sm text-ink-muted line-through mb-2'>
            {activity.currency} {activity.originalPrice.toLocaleString()}
          </div>
        )}
        <Button
          onClick={onGetTicket}
          className='w-full bg-primary text-cream mb-2'
        >
          {t('findYourTicket')}
        </Button>
      </div>
      {moreActivity && (
        <div className='bg-cream-light rounded shadow-sm border border-bronze/25 p-4'>
          <div className='font-semibold mb-2'>{t('moreActivity')}</div>
          <div className='flex gap-3 items-center mb-2'>
            <Image
              src={moreActivity.images[0] || '/images/tourist-3.jpeg'}
              alt={moreActivity.name}
              width={60}
              height={40}
              className='rounded object-cover w-[60px] h-[40px]'
            />
            <div>
              <div className='text-sm font-medium line-clamp-1'>
                {moreActivity.name}
              </div>
              <div className='text-xs text-ink-muted'>
                {moreActivity.images.length} {t('pictures')}
              </div>
            </div>
          </div>
          <Button variant='outline' className='w-full text-xs' asChild>
            <Link href={`/tourist-activity/${moreActivity.id}`}>
              {t('viewMore')}
            </Link>
          </Button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
