'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import TitleSection from '@/components/ui/title-section';

import { destinations } from '@/modules/landing-page/constant';

const ExploreIconicLandingPage = () => {
  const t = useTranslations('landingPage.exploreIconic');

  return (
    <section className='py-14 md:py-20'>
      <BaseContainer>
        <div className='flex flex-col gap-10'>
          <TitleSection title={t('title')} subTitle={t('subtitle')} />

          <Carousel
            opts={{ align: 'start', loop: true, slidesToScroll: 1 }}
            className='w-full'
          >
            <CarouselContent className='-ml-4 md:-ml-6'>
              {destinations.map((destination) => (
                <CarouselItem
                  key={destination.id}
                  className='basis-full pl-4 sm:basis-1/2 md:pl-6 xl:basis-1/3'
                >
                  <div className='group relative aspect-[4/3] w-full overflow-hidden'>
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      sizes='(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw'
                      className='object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                    {/* Scrim so the caption stays legible over any photograph */}
                    <div
                      aria-hidden
                      className='absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent'
                    />

                    <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-cream'>
                      <p className='font-display text-xl'>{destination.name}</p>
                      <p className='line-clamp-1 text-right text-sm text-cream/85'>
                        {destination.location}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='left-4 h-14 w-11 rounded-none border-0 bg-bronze/85 text-cream hover:bg-bronze hover:text-cream' />
            <CarouselNext className='right-4 h-14 w-11 rounded-none border-0 bg-bronze/85 text-cream hover:bg-bronze hover:text-cream' />
          </Carousel>
        </div>
      </BaseContainer>
    </section>
  );
};

export default ExploreIconicLandingPage;
