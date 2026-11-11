import { BedDouble, MapPin } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'use-intl';

import { formatLocation } from '@/lib/mappers/format';
import { countBedrooms, getNightlyRate } from '@/lib/mappers/villa';
import { useParams } from '@/lib/navigation';
import { useVilla } from '@/hooks/api/useVilla';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import Link from '@/components/link';
import PageMeta from '@/components/page-meta';
import Skeleton from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { StateMessage } from '@/components/ui/state-message';

import DetailTabs from '@/modules/rent-detail/detail-tabs';
import Gallery from '@/modules/rent-detail/gallery';
import BookingCard from '@/modules/rent-detail/booking-card';

const DetailSkeleton = () => (
  <div className='pt-[64px] pb-[32px]' aria-busy='true'>
    <BaseContainer>
      <div>
        <Skeleton className='h-[460px] w-full rounded md:h-[560px]' />
        <div className='mt-8 flex flex-col gap-6 lg:flex-row'>
          <div className='flex flex-1 flex-col gap-4'>
            <Skeleton className='h-36 w-full rounded' />
            <Skeleton className='h-44 w-full rounded' />
            <Skeleton className='h-56 w-full rounded' />
          </div>
          <Skeleton className='h-[640px] w-full rounded lg:w-[350px]' />
        </div>
      </div>
    </BaseContainer>
  </div>
);

const RentDetailModules = () => {
  const t = useTranslations('rentDetail.state');
  const tContent = useTranslations('rentDetail.content');
  const { name: id } = useParams();
  const { data, isLoading, isError, error } = useVilla(id);

  if (isLoading) return <DetailSkeleton />;

  const villa = data?.data;

  if (isError || !villa) {
    // The API answers 404 for an unknown id and 400 for a malformed one.
    const status = (error as { response?: { status?: number } } | null)
      ?.response?.status;
    const notFound = !isError || status === 404 || status === 400;

    return (
      <div className='pb-16 pt-[96px]'>
        <BaseContainer>
          <StateMessage
            variant={notFound ? 'empty' : 'error'}
            title={notFound ? t('notFoundTitle') : t('errorTitle')}
            description={
              notFound ? t('notFoundDescription') : t('errorDescription')
            }
            action={
              <Button variant='primary' asChild>
                <Link href='/rent'>{t('backToVillas')}</Link>
              </Button>
            }
          />
        </BaseContainer>
      </div>
    );
  }

  const bedrooms = countBedrooms(villa);
  const location = formatLocation(villa.city, villa.state);

  return (
    <div className='bg-bg pb-16 pt-[96px]'>
      <PageMeta title={villa.name} />

      <BaseContainer>
        <div className='mb-4'>
          <BreadcrumbLayout
            items={[
              { label: tContent('breadcrumbHome'), href: '/' },
              { label: tContent('breadcrumbVillas'), href: '/rent' },
              { label: tContent('breadcrumbRent'), href: '/rent/result' },
              ...(villa.country
                ? [{ label: villa.country, href: '/rent/result' }]
                : []),
              ...(villa.state
                ? [{ label: villa.state, href: '/rent/result' }]
                : []),
              ...(villa.city
                ? [{ label: villa.city, href: '/rent/result' }]
                : []),
              { label: villa.name, href: `/rent/${villa.id}`, isActive: true },
            ]}
          />
        </div>
      </BaseContainer>

      <Gallery
        name={villa.name}
        photos={villa.photos ?? []}
        videos={villa.videos}
      />

      <BaseContainer>
        <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_350px]'>
          <div className='flex min-w-0 flex-col gap-8'>
            <div className='flex flex-col gap-2 px-1'>
              {location && (
                <span className='flex items-center gap-2 text-sm text-ink-soft'>
                  <MapPin size={16} className='text-bronze-600' />
                  {location}
                </span>
              )}
              <h1 className='font-heading text-3xl text-ink'>{villa.name}</h1>
              {villa.secondaryName && (
                <p className='max-w-xl text-sm text-ink-soft'>
                  {villa.secondaryName}
                </p>
              )}
              {bedrooms > 0 && (
                <span className='mt-1 flex items-center gap-2 text-sm text-ink'>
                  <BedDouble size={16} className='text-bronze-600' />
                  {bedrooms} {tContent('bedroomsLabel')}
                </span>
              )}
            </div>

            <DetailTabs villa={villa} />
          </div>

          <aside className='lg:sticky lg:top-24 lg:self-start'>
            <BookingCard
              villa={villa}
              bedrooms={bedrooms}
              nightlyRate={getNightlyRate(villa)}
            />
          </aside>
        </div>
      </BaseContainer>
    </div>
  );
};

export default RentDetailModules;
