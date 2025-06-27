'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import { ExperienceCard } from '@/components/ui/card/experience';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextCustom,
  CarouselPreviousCustom,
} from '@/components/ui/carousel';

interface AgentImage {
  src: string;
  alt: string;
  title: string;
  countKey: string;
}

const ExploreTourist = () => {
  const t = useTranslations('touristActivity.explore');

  const agentImages: AgentImage[] = [
    {
      src: '/images/explore-tourist-1.jpeg',
      alt: '150+ journeys',
      title: t('categories.journey'),
      countKey: 'journeyCount',
    },
    {
      src: '/images/explore-tourist-2.jpeg',
      alt: '67+ cultures',
      title: t('categories.culture'),
      countKey: 'cultureCount',
    },
    {
      src: '/images/explore-tourist-3.jpeg',
      alt: '40+ events',
      title: t('categories.specialEvents'),
      countKey: 'eventsCount',
    },
  ];

  return (
    <div className='bg-white py-10 md:py-12 lg:py-[64px]'>
      <BaseContainer>
        <div className='flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 md:items-center'>
          {/* Left section with title and description */}
          <div className='w-full md:max-w-[400px] flex flex-col gap-2 md:gap-4 justify-center'>
            <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-primary'>
              {t('title')}
            </h2>
            <p className='text-text text-base md:text-lg lg:text-[22px]'>
              {t('subtitle')}
            </p>
          </div>

          {/* Carousel section */}
          <div className='w-full md:flex-1'>
            <Carousel
              opts={{
                loop: true,
              }}
              className='flex flex-col gap-4'
            >
              {/* Navigation controls - aligned right */}
              <div className='flex gap-2 self-end'>
                <CarouselPreviousCustom />
                <CarouselNextCustom />
              </div>

              {/* Carousel content with responsive sizes */}
              <CarouselContent>
                {agentImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className='basis-full sm:basis-1/2 md:basis-1/3 pl-4 md:pl-6'
                  >
                    <div className='relative aspect-[3/4] w-full h-fit sm:h-full'>
                      <ExperienceCard
                        count={t(image.countKey)}
                        title={image.title}
                        image={image.src}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ExploreTourist;
