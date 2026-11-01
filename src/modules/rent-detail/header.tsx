import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';
import { type CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

/** Shown when a villa has no photos yet, so the layout never collapses. */
const PLACEHOLDER = '/images/header-landing-page.png';

interface HeaderRentDetailProps {
  photos: string[];
  name: string;
}

const HeaderRentDetail = ({ photos, name }: HeaderRentDetailProps) => {
  const t = useTranslations('rentDetail.header');

  const images = photos.length > 0 ? photos : [PLACEHOLDER];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Start on the middle photo, as the design always has.
  const initialSlideIndex = Math.floor(images.length / 2);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);

    const timeout = setTimeout(() => {
      api.scrollTo(initialSlideIndex);
      setCurrent(initialSlideIndex);
    }, 100);

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);

    return () => {
      clearTimeout(timeout);
      api.off('select', onSelect);
    };
  }, [api, initialSlideIndex]);

  return (
    <div className='pt-[64px] pb-[32px]'>
      <BaseContainer>
        <div className='relative w-full'>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'center',
              loop: images.length > 1,
            }}
            className='w-full bg-cream-light'
          >
            <CarouselContent className='-ml-4 items-center'>
              {images.map((image, index) => (
                <CarouselItem
                  key={image}
                  className='pl-4 h-[460px] md:h-[560px] flex items-center basis-full sm:basis-2/3 md:basis-3/4 '
                >
                  <div
                    className={`w-full overflow-hidden transition-all duration-300 ease-in-out rounded ${
                      current === index
                        ? 'h-[460px] md:h-[560px] z-10'
                        : 'h-[380px] md:h-[480px] opacity-50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${name} - ${t('imageAlt')} ${index + 1}`}
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

            {images.length > 1 && (
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
            )}
          </Carousel>

          {images.length > 1 && (
            <>
              <div className='flex justify-center mt-6 gap-2'>
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      current === index
                        ? 'bg-primary w-6'
                        : 'bg-bronze/25 hover:bg-bronze/40'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className='absolute bottom-4 right-4 bg-ink/50 text-cream text-sm px-2 py-1 rounded'>
                {current + 1} {t('slideIndicator')} {count}
              </div>
            </>
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default HeaderRentDetail;
