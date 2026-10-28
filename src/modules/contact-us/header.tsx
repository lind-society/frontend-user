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

const CAROUSEL_IMAGES = [
  '/images/header-contact-us.jpeg',
  '/images/explore-1.png',
  '/images/explore-2.png',
];

const HeaderContactUs = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const t = useTranslations('contactUs');

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className='relative isolate flex min-h-[620px] items-center overflow-hidden pt-[72px] lg:min-h-[680px] lg:pt-[92px]'>
      <Carousel
        setApi={setApi}
        className='absolute inset-0 -z-10 h-full w-full'
        opts={{ loop: true, duration: 50 }}
      >
        <CarouselContent className='h-full'>
          {CAROUSEL_IMAGES.map((image, index) => (
            <CarouselItem key={index} className='relative h-[680px]'>
              <Image
                src={image}
                alt=''
                aria-hidden
                fill
                sizes='100vw'
                quality={85}
                priority={index === 0}
                className='object-cover object-center'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div aria-hidden className='absolute inset-0 -z-10 bg-ink/50' />

      <BaseContainer>
        <div className='mx-auto flex max-w-3xl flex-col items-center gap-5 py-20 text-center'>
          <h1 className='text-cream'>{t('header.title')}</h1>
          <p className='text-base text-cream/85 md:text-lg'>
            {t('header.subtitle')}
          </p>
        </div>
      </BaseContainer>

      {/* Slide indicator */}
      <div className='absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2'>
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            type='button'
            className={`h-2.5 rounded-full transition-all ${
              current === index ? 'w-7 bg-bronze' : 'w-2.5 bg-cream/60'
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeaderContactUs;
