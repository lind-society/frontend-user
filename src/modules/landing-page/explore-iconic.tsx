'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { destinations } from '@/modules/landing-page/constant';

// Define destination type

const ExploreIconicLandingPage = () => {
  const [api, setApi] = useState<CarouselApi>();

  // Use effect to track carousel state
  useEffect(() => {
    if (!api) {
      return;
    }
  }, [api]);

  return (
    <div className='py-10 md:py-16'>
      <BaseContainer>
        <div className='flex flex-col gap-6 md:gap-8'>
          <div className='flex flex-col gap-2'>
            <h3 className='text-center text-primary text-2xl md:text-3xl font-semibold'>
              Explore Our Iconic Destination
            </h3>
            <p className='text-text font-normal text-center px-4 md:px-0'>
              Travel beyond the ordinary and embrace the magic of the world's
              most iconic destinations.
            </p>
          </div>

          {/* Carousel wrapper */}
          <div className='relative'>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
                // Show different number of slides based on viewport width
                slidesToScroll: 1,
              }}
              className='w-full'
              setApi={setApi}
            >
              <CarouselContent className='-ml-2 md:-ml-4'>
                {destinations.map((destination) => (
                  <CarouselItem
                    key={destination.id}
                    className='pl-2 md:pl-4 basis-full sm:basis-1/2 xl:basis-1/3'
                  >
                    <div className='relative h-[280px] md:h-[380px] lg:h-[439px] w-full rounded-lg overflow-hidden'>
                      {/* Image with proper gradient overlay */}
                      <div className='absolute inset-0 z-10 bg-gradient-to-b from-black/0 via-black/0 to-black/80'></div>
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className='object-cover w-full h-full'
                      />

                      {/* Location text overlay */}
                      <div className='absolute bottom-0 left-0 right-0 z-20 p-5 flex justify-between items-center text-white gap-2'>
                        <p className='text-lg md:text-xl font-semibold whitespace-nowrap'>
                          {destination.name}
                        </p>
                        <p className='text-sm md:text-base font-normal line-clamp-1 text-end'>
                          {destination.location}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation arrows */}
              <CarouselPrevious className='left-2 md:left-4 lg:left-6 bg-white/80 hover:bg-white' />
              <CarouselNext className='right-2 md:right-4 lg:right-6 bg-white/80 hover:bg-white' />
            </Carousel>
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default ExploreIconicLandingPage;
