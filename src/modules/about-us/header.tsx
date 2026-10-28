'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

const HeaderAboutUs = () => {
  const t = useTranslations('aboutUs.header');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Background images for carousel
  const carouselImages = [
    '/images/header-about-us.jpeg',
    '/images/explore-1.png',
    '/images/explore-2.png',
  ];

  // Update current slide index when slide changes
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);
  return (
    <div className='relative py-20 md:pt-28 md:pb-36 lg:pt-32 lg:pb-48 overflow-hidden'>
      {/* Carousel for background images */}
      <Carousel
        setApi={setApi}
        className='w-full h-full absolute inset-0'
        opts={{
          loop: true,
          duration: 50,
        }}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className='h-[520px]'>
              <Image
                src={image}
                alt={`LIND Society - Contact Us Slide ${index + 1}`}
                sizes='100vw'
                className='object-cover object-center z-0 w-full h-full'
                quality={85}
                priority={index === 0}
                width={0}
                height={0}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-ink/50 '></div>

      {/* Carousel dots indicator */}
      <div className='absolute left-1/2 -translate-x-1/2 bottom-8 z-20 flex items-center gap-2'>
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 rounded-full transition-all ${
              current === index ? 'w-7 bg-bronze' : 'w-2.5 bg-cream/60'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <BaseContainer>
        <div className='relative z-20 flex flex-col items-center gap-4 md:gap-6 text-center'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cream max-w-4xl'>
            {t('title')}
          </h1>
          <p className='text-base md:text-lg lg:text-xl text-cream/90 max-w-3xl mx-auto font-light'>
            {t('subtitle')}
          </p>
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderAboutUs;
