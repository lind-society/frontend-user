'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { VillaCard } from '@/components/ui/card/villa';
import { TextTabs } from '@/components/ui/text-tabs';
import TitleSection from '@/components/ui/title-section';

import { villas } from '@/modules/landing-page/constant';

type RentType = 'rent' | 'sale';
type ScheduleType = 'daily' | 'monthly' | 'yearly';

const ExploreBestListLandingPage = () => {
  const t = useTranslations('landingPage.exploreBest');

  const [activeRentType, setActiveRentType] = useState<RentType>('rent');
  const [activeSchedule, setActiveSchedule] = useState<ScheduleType>('daily');

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

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {villas.map((villa) => (
              <VillaCard
                key={villa.id}
                villa={villa}
                onFavoriteToggle={toggleFavorite}
                rentType={activeRentType}
              />
            ))}
          </div>

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
