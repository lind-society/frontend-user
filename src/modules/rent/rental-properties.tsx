'use client';

import { Slash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

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

import { villas } from '@/modules/rent/constant';

const RentalPropertiesRentPage = () => {
  const t = useTranslations('rent');
  const breadcrumbT = useTranslations('rent.breadcrumb');

  const toggleFavorite = (id: number) => {
    // In a real app, you would update this in your state management
    // eslint-disable-next-line no-console
    console.log(`Toggled favorite for villa ${id}`);
  };
  return (
    <BaseContainer>
      <div className='flex flex-col gap-8 py-8'>
        <div className='rounded-md bg-white border px-3 py-1'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href='/'>{breadcrumbT('home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem className='font-semibold'>
                <BreadcrumbLink href='/rent'>
                  {breadcrumbT('rentalProperties')}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
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

        {/* View more button */}
        <div className='flex justify-center '>
          <Button
            variant='ghost'
            className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
          >
            {t('rentalProperties.showMore')}
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default RentalPropertiesRentPage;
