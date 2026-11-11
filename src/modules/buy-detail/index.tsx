import { BedDouble, MapPin } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'use-intl';

import { formatLocation, formatPrice } from '@/lib/mappers/format';
import { useParams } from '@/lib/navigation';
import { useProperty } from '@/hooks/api/useProperty';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import Link from '@/components/link';
import PageMeta from '@/components/page-meta';
import Skeleton from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { StateMessage } from '@/components/ui/state-message';

import SendInquiryFormBuy from '@/modules/buy-detail/inquiry-form';
import DetailTabs from '@/modules/rent-detail/detail-tabs';
import Gallery from '@/modules/rent-detail/gallery';

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
          <Skeleton className='h-[560px] w-full rounded lg:w-[350px]' />
        </div>
      </div>
    </BaseContainer>
  </div>
);

const BuyDetailModules = () => {
  const t = useTranslations('buyDetail.state');
  const tContent = useTranslations('rentDetail.content');
  const { name: id } = useParams();
  const { data, isLoading, isError, error } = useProperty(id);

  if (isLoading) return <DetailSkeleton />;

  const property = data?.data;

  if (isError || !property) {
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
                <Link href='/buy'>{t('backToProperties')}</Link>
              </Button>
            }
          />
        </BaseContainer>
      </div>
    );
  }

  const symbol = property.currency?.symbol;
  const price = Number(property.priceAfterDiscount || property.price);
  const bedrooms =
    property.additionals?.filter((additional) => additional.type === 'bedrooms')
      .length ?? 0;
  const location = formatLocation(property.city, property.state);

  return (
    <div className='bg-bg pb-16 pt-[96px]'>
      <PageMeta title={property.name} />

      <BaseContainer>
        <div className='mb-4'>
          <BreadcrumbLayout
            items={[
              { label: tContent('breadcrumbHome'), href: '/' },
              { label: tContent('breadcrumbVillas'), href: '/buy' },
              ...(property.country
                ? [{ label: property.country, href: '/buy/result' }]
                : []),
              ...(property.state
                ? [{ label: property.state, href: '/buy/result' }]
                : []),
              ...(property.city
                ? [{ label: property.city, href: '/buy/result' }]
                : []),
              {
                label: property.name,
                href: `/buy/${property.id}`,
                isActive: true,
              },
            ]}
          />
        </div>
      </BaseContainer>

      <Gallery
        name={property.name}
        photos={property.photos ?? []}
        videos={property.videos}
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
              <h1 className='font-heading text-3xl text-ink'>
                {property.name}
              </h1>
              {property.secondaryName && (
                <p className='max-w-xl text-sm text-ink-soft'>
                  {property.secondaryName}
                </p>
              )}
              {bedrooms > 0 && (
                <span className='mt-1 flex items-center gap-2 text-sm text-ink'>
                  <BedDouble size={16} className='text-bronze-600' />
                  {bedrooms} {tContent('bedroomsLabel')}
                </span>
              )}
            </div>

            <DetailTabs
              villa={property}
              tabs={['highlights', 'amenities', 'rooms', 'location']}
            />
          </div>

          <aside className='lg:sticky lg:top-24 lg:self-start'>
            <SendInquiryFormBuy
              property={property}
              priceLabel={formatPrice(price, symbol)}
            />
          </aside>
        </div>
      </BaseContainer>
    </div>
  );
};

export default BuyDetailModules;
