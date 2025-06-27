'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import { type CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Sample villa images
const villaImages = [
  '/images/explore-1.png',
  '/images/explore-2.png',
  '/images/explore-3.png',
  '/images/discover-4.jpeg',
  '/images/discover-5.jpeg',
];

const HeaderRentDetail = () => {
  const t = useTranslations('rentDetail.header');

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Calculate middle index for initial slide
  const initialSlideIndex = Math.floor(villaImages.length / 2);

  // Set initial slide and track current slide
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    // Set initial slide to middle on component mount
    const timeout = setTimeout(() => {
      api.scrollTo(initialSlideIndex);
      setCurrent(initialSlideIndex);
    }, 100);

    // Track slide changes
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });

    return () => clearTimeout(timeout);
  }, [api, initialSlideIndex]);

  return (
    <div className='pt-[64px] pb-[32px]'>
      <BaseContainer>
        <div className='relative w-full'>
          {/* Main Carousel */}
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: true,
            }}
            className='w-full bg-white'
          >
            <CarouselContent className='-ml-4 items-center'>
              {villaImages.map((image, index) => (
                <CarouselItem
                  key={index}
                  className='pl-4 h-[460px] md:h-[560px] flex items-center basis-full sm:basis-2/3 md:basis-3/4 '
                >
                  <div
                    className={`w-full overflow-hidden transition-all duration-300 ease-in-out rounded-lg ${
                      current === index
                        ? 'h-[460px] md:h-[560px] z-10'
                        : 'h-[380px] md:h-[480px] opacity-50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${t('imageAlt')} ${index + 1}`}
                      className='w-full h-full object-cover transition-transform hover:scale-105 duration-700'
                      width={1080}
                      height={720}
                      sizes='100vw'
                      priority={index === initialSlideIndex}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom navigation buttons */}
            <div className='absolute inset-0 flex items-center justify-between pointer-events-none'>
              <CarouselPrevious
                className='pointer-events-auto w-12 h-12 opacity-80 hover:opacity-100 -ml-4 md:-ml-6'
                variant='outline'
              >
                <ChevronLeft className='h-6 w-6' />
              </CarouselPrevious>
              <CarouselNext
                className='pointer-events-auto w-12 h-12 opacity-80 hover:opacity-100 -mr-4 md:-mr-6'
                variant='outline'
              >
                <ChevronRight className='h-6 w-6' />
              </CarouselNext>
            </div>
          </Carousel>

          {/* Navigation dots */}
          <div className='flex justify-center mt-6 gap-2'>
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === index
                    ? 'bg-primary w-6'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Current slide indicator text */}
          <div className='absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-md'>
            {current + 1} {t('slideIndicator')} {count}
          </div>
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderRentDetail;
