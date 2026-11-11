import { Clock, Users } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useTranslations } from 'use-intl';

import { formatPrice } from '@/lib/mappers/format';
import { useActivities } from '@/hooks/api/useActivity';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import Skeleton from '@/components/Skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StateMessage } from '@/components/ui/state-message';

import JournalBanner from '@/modules/about-us/journal-banner';

import { Activity } from '@/types/api/activity';

/** Shown when an activity has no photo yet. */
const PLACEHOLDER = '/images/header-tourist.jpeg';

type SortKey = 'recommended' | 'priceLow' | 'priceHigh' | 'rating';

const priceOf = (activity: Activity) =>
  Number(activity.priceAfterDiscount ?? activity.price) || 0;

const ActivityCard = ({ activity }: { activity: Activity }) => {
  const t = useTranslations('touristActivity.list');
  const symbol = activity.currency?.symbol ?? activity.currency?.code;

  return (
    <Link
      href={`/tourist-activity/${activity.id}`}
      className='group flex h-full flex-col overflow-hidden rounded border border-bronze/15 bg-cream-light shadow-xs transition-shadow hover:shadow-md'
    >
      <div className='relative aspect-[16/10] w-full overflow-hidden'>
        <Image
          src={activity.photos?.[0] ?? PLACEHOLDER}
          alt={activity.name}
          fill
          sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
          className='object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>

      <div className='flex flex-1 flex-col gap-2 p-4'>
        {activity.category?.name && (
          <span className='text-[10px] uppercase tracking-[0.12em] text-bronze-600'>
            {activity.category.name}
          </span>
        )}
        <h3 className='font-heading text-lg text-ink'>{activity.name}</h3>
        <p className='line-clamp-2 text-sm text-ink-soft'>
          {activity.highlight}
        </p>
        <p className='mt-1 text-sm text-ink'>
          {t('from')}{' '}
          <span className='font-semibold'>
            {formatPrice(priceOf(activity), symbol)}
          </span>{' '}
          / {activity.priceUnit || 'session'}
        </p>

        <div className='mt-auto flex items-center justify-between border-t border-bronze/15 pt-3 text-xs text-ink-soft'>
          <span className='flex items-center gap-1.5'>
            <Clock size={14} className='text-bronze-600' />
            {activity.openingHour}–{activity.closingHour}
          </span>
          {activity.dailyLimit > 0 && (
            <span className='flex items-center gap-1.5'>
              <Users size={14} className='text-bronze-600' />
              {activity.dailyLimit} {t('perDay')}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

/** "Unique Experiences" — the tourist-activity listing from the new design. */
const TouristActivityModules = () => {
  const t = useTranslations('touristActivity.list');

  // Categories and sorting run client-side over one generous page, as before.
  const { data, isLoading, isError } = useActivities({ page: 1, limit: 200 });
  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<SortKey>('recommended');

  const activities = useMemo(() => data?.data.data ?? [], [data]);

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          activities
            .map((activity) => activity.category?.name)
            .filter((name): name is string => Boolean(name))
        )
      ),
    [activities]
  );

  const visible = useMemo(() => {
    const filtered = category
      ? activities.filter((activity) => activity.category?.name === category)
      : activities;

    return [...filtered].sort((a, b) => {
      if (sort === 'priceLow') return priceOf(a) - priceOf(b);
      if (sort === 'priceHigh') return priceOf(b) - priceOf(a);
      if (sort === 'rating') return b.averageRating - a.averageRating;
      return (b.totalReview ?? 0) - (a.totalReview ?? 0);
    });
  }, [activities, category, sort]);

  return (
    <div className='bg-cream-light'>
      {/* Hero */}
      <div className='relative h-[220px] overflow-hidden md:h-[280px]'>
        <Image
          src='/images/header-tourist.jpeg'
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover'
        />
        <div aria-hidden className='absolute inset-0 bg-ink/30' />
        <BaseContainer>
          <div className='relative flex h-[220px] flex-col justify-end gap-3 pb-10 text-cream md:h-[280px]'>
            <h1 className='font-heading text-3xl md:text-4xl'>{t('title')}</h1>
            <p className='max-w-sm border-l-2 border-cream pl-4 text-sm md:text-base'>
              {t('subtitle')}
            </p>
          </div>
        </BaseContainer>
      </div>

      <BaseContainer>
        <div className='flex flex-col gap-8 py-10 md:py-12'>
          {/* Category pills + sort */}
          <div className='flex flex-wrap items-center justify-between gap-4'>
            <div className='flex flex-wrap items-center gap-2'>
              {['', ...categories].map((name) => (
                <button
                  key={name || 'all'}
                  type='button'
                  onClick={() => setCategory(name)}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.08em] transition-colors ${
                    category === name
                      ? 'bg-bronze-600 text-cream'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {name || t('all')}
                </button>
              ))}
            </div>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className='w-[210px]' aria-label={t('sortBy')}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='recommended'>{t('recommended')}</SelectItem>
                <SelectItem value='priceLow'>{t('priceLow')}</SelectItem>
                <SelectItem value='priceHigh'>{t('priceHigh')}</SelectItem>
                <SelectItem value='rating'>{t('rating')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cards */}
          {isLoading ? (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className='h-[340px] w-full rounded' />
              ))}
            </div>
          ) : isError ? (
            <StateMessage
              variant='error'
              title={t('errorTitle')}
              description={t('errorDescription')}
            />
          ) : visible.length === 0 ? (
            <StateMessage
              title={t('emptyTitle')}
              description={t('emptyDescription')}
            />
          ) : (
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {visible.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </BaseContainer>

      <JournalBanner />
    </div>
  );
};

export default TouristActivityModules;
