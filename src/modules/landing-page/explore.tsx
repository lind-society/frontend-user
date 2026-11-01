import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import { toPropertyCard } from '@/lib/mappers/property';
import { toVillaCard } from '@/lib/mappers/villa';
import { useProperties } from '@/hooks/api/useProperty';
import { useVillasBestSeller } from '@/hooks/api/useVilla';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import { Button } from '@/components/ui/button';
import { VillaCard } from '@/components/ui/card/villa';
import { StateMessage } from '@/components/ui/state-message';
import { TextTabs } from '@/components/ui/text-tabs';
import TitleSection from '@/components/ui/title-section';

type RentType = 'rent' | 'sale';
type ScheduleType = 'daily' | 'monthly' | 'yearly';

const ExploreBestListLandingPage = () => {
  const t = useTranslations('landingPage.exploreBest');

  const [activeRentType, setActiveRentType] = useState<RentType>('rent');
  const [activeSchedule, setActiveSchedule] = useState<ScheduleType>('daily');

  const states = useTranslations('states');

  // Best-rated villas for rent, filtered by how long the guest wants to stay;
  // properties for sale are simply the latest listings.
  const rentals = useVillasBestSeller();
  const sales = useProperties({ page: 1, limit: 6 });

  const isRent = activeRentType === 'rent';
  const { isLoading, isError } = isRent ? rentals : sales;

  const listings = React.useMemo(() => {
    if (isRent) {
      return (rentals.data?.data.data ?? [])
        .filter((villa) => villa.availability?.[activeSchedule])
        .slice(0, 6)
        .map(toVillaCard);
    }

    return (sales.data?.data.data ?? []).slice(0, 6).map(toPropertyCard);
  }, [isRent, activeSchedule, rentals.data, sales.data]);

  const toggleFavorite = (id: string | number) => {
    // In a real app, you would update this in your state management
    // eslint-disable-next-line no-console
    console.log(`Toggled favorite for villa ${id}`);
  };

  const viewMoreLink = activeRentType === 'rent' ? '/rent' : '/buy';

  const rentTypeOptions = [
    { value: 'rent' as const, label: t('forRent') },
    { value: 'sale' as const, label: t('forSale') },
  ];

  const scheduleOptions = [
    { value: 'daily' as const, label: t('daily') },
    { value: 'monthly' as const, label: t('monthly') },
    { value: 'yearly' as const, label: t('yearly') },
  ];

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <TitleSection title={t('title')} subTitle={t('subtitle')} />

          {/* Filters */}
          <div className='flex flex-col gap-4 border-b border-bronze/25 pb-3 sm:flex-row sm:items-center sm:justify-between'>
            <TextTabs
              options={rentTypeOptions}
              value={activeRentType}
              onChange={setActiveRentType}
            />

            {/* Duration only applies to rentals */}
            {activeRentType === 'rent' && (
              <TextTabs
                options={scheduleOptions}
                value={activeSchedule}
                onChange={setActiveSchedule}
              />
            )}
          </div>

          {isLoading ? (
            <div
              className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
              aria-busy='true'
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className='h-[420px] animate-pulse rounded bg-sand/40'
                />
              ))}
            </div>
          ) : isError ? (
            <StateMessage
              variant='error'
              title={states(isRent ? 'error.villas' : 'error.properties')}
              description={states('error.description')}
            />
          ) : listings.length === 0 ? (
            <StateMessage
              title={states(isRent ? 'empty.villas' : 'empty.properties')}
              description={states(
                isRent
                  ? 'empty.villasDescription'
                  : 'empty.propertiesDescription'
              )}
            />
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {listings.map((listing) => (
                <VillaCard
                  key={listing.id}
                  villa={listing}
                  onFavoriteToggle={toggleFavorite}
                  rentType={activeRentType}
                />
              ))}
            </div>
          )}

          <div className='mt-2 flex justify-center'>
            <Button variant='outline' className='px-10' asChild>
              <Link href={viewMoreLink}>{t('viewMore')}</Link>
            </Button>
          </div>
        </div>
      </BaseContainer>
    </section>
  );
};

export default ExploreBestListLandingPage;
