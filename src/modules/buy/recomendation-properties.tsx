'use client';

import { Slash } from 'lucide-react';
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

const RecomendationPropertiesBuyPage = () => {
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
                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem className='font-semibold'>
                <BreadcrumbLink href='/buy'>Buy properties</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* Header Section - Responsive column on mobile, row on desktop */}
        <div className='flex sm:flex-row flex-col gap-6 justify-between items-center'>
          <div className='flex flex-col gap-2 '>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-semibold text-primary'>
              Our Recomendation Properties
            </h2>
            <p className='text-base md:text-lg text-text'>
              Browse recomendation villas by ownership type
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='primary' className='flex gap-2 items-center'>
              Leasehold
            </Button>
            <Button variant='outline' className='flex gap-2 items-center'>
              Freehold
            </Button>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {villas.map((villa) => (
            <VillaCard
              key={villa.id}
              villa={villa}
              onFavoriteToggle={toggleFavorite}
              rentType='sale'
            />
          ))}
        </div>

        {/* View more button */}
        <div className='flex justify-center '>
          <Button
            variant='ghost'
            className='border-primary text-primary hover:bg-primary/10 underline font-semibold'
          >
            Show more properties (118)
          </Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default RecomendationPropertiesBuyPage;
