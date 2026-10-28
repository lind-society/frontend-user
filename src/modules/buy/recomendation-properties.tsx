'use client';

import { Slash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { toPropertyCard } from '@/lib/mappers/property';
import { useProperties } from '@/hooks/api/useProperty';

import BaseContainer from '@/components/layouts/container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { VillaCard } from '@/components/ui/card/villa';
import { StateMessage } from '@/components/ui/state-message';

import { PropertyOwnershipType } from '@/types/api/property';

const PAGE_SIZE = 9;

const RecomendationPropertiesBuyPage = () => {
  const t = useTranslations('buy');
  const states = useTranslations('states');

  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const [ownership, setOwnership] =
    React.useState<PropertyOwnershipType>('leasehold');

  const { data, isLoading, isError } = useProperties({
    page: 1,
    limit,
    // nestjs-paginate filter syntax: filter.<column>=$eq:<value>
    'filter.ownershipType': `$eq:${ownership}`,
  });

  const properties = React.useMemo(
    () => (data?.data.data ?? []).map(toPropertyCard),
    [data]
  );

  const totalItems = data?.data.meta.totalItems ?? 0;
  const hasMore = properties.length < totalItems;

  const selectOwnership = (value: PropertyOwnershipType) => {
    setOwnership(value);
    setLimit(PAGE_SIZE);
  };

  const toggleFavorite = (id: string | number) => {
    // In a real app, you would update this in your state management
    // eslint-disable-next-line no-console
    console.log(`Toggled favorite for property ${id}`);
  };

  return (
    <BaseContainer>
      <div className='flex flex-col gap-8 py-8'>
        <div className='rounded bg-cream-light border px-3 py-1'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>{t('breadcrumb.home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem className='font-semibold'>
                <BreadcrumbLink href='/buy'>
                  {t('breadcrumb.buyProperties')}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Header Section - Responsive column on mobile, row on desktop */}
        <div className='flex sm:flex-row flex-col gap-6 justify-between items-center'>
          <div className='flex flex-col gap-2 '>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-primary'>
              {t('recomendationProperties.title')}
            </h2>
            <p className='text-base md:text-lg text-text'>
              {t('recomendationProperties.subtitle')}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button
              variant={ownership === 'leasehold' ? 'primary' : 'outline'}
              onClick={() => selectOwnership('leasehold')}
              className='flex gap-2 items-center'
            >
              {t('recomendationProperties.leasehold')}
            </Button>
            <Button
              variant={ownership === 'freehold' ? 'primary' : 'outline'}
              onClick={() => selectOwnership('freehold')}
              className='flex gap-2 items-center'
            >
              {t('recomendationProperties.freehold')}
            </Button>
          </div>
        </div>

        {isError && (
          <StateMessage
            variant='error'
            title={states('error.properties')}
            description={states('error.description')}
          />
        )}

        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <div
                key={index}
                className='h-[420px] rounded bg-sand/40 animate-pulse'
              />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {properties.map((property) => (
              <VillaCard
                key={property.id}
                villa={property}
                onFavoriteToggle={toggleFavorite}
                rentType='sale'
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && properties.length === 0 && (
          <StateMessage
            title={states('empty.properties')}
            description={states('empty.propertiesDescription')}
          />
        )}

        {/* View more button */}
        {hasMore && (
          <div className='flex justify-center '>
            <Button
              variant='ghost'
              onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
              className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
            >
              {t('recomendationProperties.showMore')}
            </Button>
          </div>
        )}
      </div>
    </BaseContainer>
  );
};

export default RecomendationPropertiesBuyPage;
