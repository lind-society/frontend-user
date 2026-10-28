'use client';

import { Slash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { toVillaCard } from '@/lib/mappers/villa';
import { useVillas } from '@/hooks/api/useVilla';

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

const PAGE_SIZE = 9;

const RentalPropertiesRentPage = () => {
  const t = useTranslations('rent');
  const breadcrumbT = useTranslations('rent.breadcrumb');
  const states = useTranslations('states');

  const [limit, setLimit] = React.useState(PAGE_SIZE);

  const { data, isLoading, isError } = useVillas({ page: 1, limit });

  const villas = React.useMemo(
    () => (data?.data.data ?? []).map(toVillaCard),
    [data]
  );

  const totalItems = data?.data.meta.totalItems ?? 0;
  const hasMore = villas.length < totalItems;

  const toggleFavorite = (id: string | number) => {
    // In a real app, you would update this in your state management
    // eslint-disable-next-line no-console
    console.log(`Toggled favorite for villa ${id}`);
  };
  return (
    <section>
      <BaseContainer>
        <div className='flex flex-col gap-8 py-8'>
          <div className='rounded-sm border border-bronze/25 bg-cream-light px-4 py-2'>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>
                    {breadcrumbT('home')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem className='font-heading text-[15px] font-semibold text-bronze-600'>
                  <BreadcrumbLink href='/rent'>
                    {breadcrumbT('rentalProperties')}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {isError && (
            <StateMessage
              variant='error'
              title={states('error.villas')}
              description={states('error.description')}
            />
          )}

          {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div
                  key={index}
                  className='h-[420px] animate-pulse rounded bg-sand/60'
                />
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {villas.map((villa) => (
                <VillaCard
                  key={villa.id}
                  villa={villa}
                  onFavoriteToggle={toggleFavorite}
                  rentType='rent'
                />
              ))}
            </div>
          )}

          {!isLoading && !isError && villas.length === 0 && (
            <StateMessage
              title={states('empty.villas')}
              description={states('empty.villasDescription')}
            />
          )}

          {/* View more button */}
          {hasMore && (
            <div className='flex justify-center '>
              <Button
                variant='outline'
                onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
                className='px-10'
              >
                {t('rentalProperties.showMore')}
              </Button>
            </div>
          )}
        </div>
      </BaseContainer>
    </section>
  );
};

export default RentalPropertiesRentPage;
