'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { VillaCard } from '@/components/ui/card/villa';
import { Separator } from '@/components/ui/separator';

import { villas } from '@/modules/landing-page/constant';

type RentType = 'rent' | 'sale';
type ScheduleType = 'daily' | 'monthly' | 'yearly';

const ExploreBestListLandingPage = () => {
  const [activeRentType, setActiveRentType] = useState<RentType>('rent');
  const [activeSchedule, setActiveSchedule] = useState<ScheduleType>('daily');

  const handleRentTypeChange = (type: RentType) => {
    setActiveRentType(type);
  };

  const handleScheduleChange = (schedule: ScheduleType) => {
    setActiveSchedule(schedule);
  };

  const toggleFavorite = (id: number) => {
    // In a real app, you would update this in your state management
    // eslint-disable-next-line no-console
    console.log(`Toggled favorite for villa ${id}`);
  };

  // Determine the view more link based on the active rent type
  const viewMoreLink = activeRentType === 'rent' ? '/rent' : '/buy';

  return (
    <div className='py-10 md:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          <h3 className='text-center text-primary text-2xl md:text-3xl font-semibold'>
            Explore LIND's Best List
          </h3>

          {/* Filter controls - responsive layout */}
          <div className='flex flex-col md:flex-row md:justify-between gap-4 md:gap-0'>
            <div className='flex gap-2 md:gap-3 overflow-x-auto hideScrollbar'>
              <Button
                variant={activeRentType === 'rent' ? 'primary' : 'secondary'}
                onClick={() => handleRentTypeChange('rent')}
                className='whitespace-nowrap'
              >
                For Rent
              </Button>
              <Button
                variant={activeRentType === 'sale' ? 'primary' : 'secondary'}
                onClick={() => handleRentTypeChange('sale')}
                className='whitespace-nowrap'
              >
                For Sale
              </Button>
            </div>

            {/* Only show schedule filter for rent */}
            {activeRentType === 'rent' && (
              <div className='flex gap-2 md:gap-3 overflow-x-auto hideScrollbar'>
                <Button
                  variant={activeSchedule === 'daily' ? 'primary' : 'secondary'}
                  onClick={() => handleScheduleChange('daily')}
                  className='whitespace-nowrap'
                >
                  Daily
                </Button>
                <Button
                  variant={
                    activeSchedule === 'monthly' ? 'primary' : 'secondary'
                  }
                  onClick={() => handleScheduleChange('monthly')}
                  className='whitespace-nowrap'
                >
                  Monthly
                </Button>
                <Button
                  variant={
                    activeSchedule === 'yearly' ? 'primary' : 'secondary'
                  }
                  onClick={() => handleScheduleChange('yearly')}
                  className='whitespace-nowrap'
                >
                  Yearly
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* Villa cards - responsive grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {villas.map((villa) => (
              <VillaCard
                key={villa.id}
                villa={villa}
                onFavoriteToggle={toggleFavorite}
                rentType={activeRentType}
              />
            ))}
          </div>

          {/* View more button with dynamic link */}
          <div className='flex justify-center mt-6'>
            <Button
              variant='outline'
              className='border-primary text-primary hover:bg-primary/10'
              asChild
            >
              <Link href={viewMoreLink}>View More</Link>
            </Button>
          </div>
        </div>
      </BaseContainer>

      {/* Responsive CSS for hiding scrollbar */}
      <style jsx global>{`
        .hideScrollbar::-webkit-scrollbar {
          display: none;
        }
        .hideScrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ExploreBestListLandingPage;
