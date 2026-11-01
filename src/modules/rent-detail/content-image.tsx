import React from 'react';
import { useTranslations } from 'use-intl';

import { toVillaCard } from '@/lib/mappers/villa';
import { useVillas } from '@/hooks/api/useVilla';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';
import { VillaCard } from '@/components/ui/card/villa';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { Villa } from '@/types/api/villa';

type AdditionalType = NonNullable<Villa['additionals']>[number]['type'];

/** Order the room/area galleries appear in. */
const GALLERY_ORDER: AdditionalType[] = [
  'bedrooms',
  'indoor_areas',
  'outdoor_areas',
  'more_pictures',
];

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className='px-4 sm:px-6 py-4 flex flex-col gap-6 bg-cream-light rounded border'>
    <span className='text-xl text-primary font-semibold'>{title}</span>
    {children}
  </section>
);

interface Slide {
  id: string;
  src: string;
  title: string;
  description?: string | null;
  count: number;
}

const ImageGallerySection = ({
  title,
  slides,
}: {
  title: string;
  slides: Slide[];
}) => {
  const t = useTranslations('rentDetail.gallery');

  return (
    <Section title={title}>
      <Carousel
        opts={{ align: 'start', loop: slides.length > 3 }}
        className='w-full'
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className='sm:basis-1/2 md:basis-1/3'>
              <div className='flex flex-col gap-3 px-2'>
                <div className='h-[220px] w-full relative'>
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-[220px] w-full object-cover rounded'
                  />
                  <div className='absolute bottom-0 left-0 bg-primary rounded-tr py-2 px-4 text-cream'>
                    {slide.count}{' '}
                    {slide.count === 1 ? t('picture') : t('pictures')}
                  </div>
                </div>
                <span className='text-text text-lg font-semibold'>
                  {slide.title}
                </span>
                {slide.description && (
                  <span className='text-text'>{slide.description}</span>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {slides.length > 1 && (
          <>
            <CarouselPrevious className='left-0 bg-cream-light/80 hover:bg-cream-light border-primary text-primary' />
            <CarouselNext className='right-0 bg-cream-light/80 hover:bg-cream-light border-primary text-primary' />
          </>
        )}
      </Carousel>
    </Section>
  );
};

type ListingMediaSource = Pick<
  Villa,
  'additionals' | 'videos' | 'video360s' | 'floorPlans'
>;

/** Videos, 360° tours, room galleries and floor plans of one listing. */
export const ListingMedia = ({ listing }: { listing: ListingMediaSource }) => {
  const t = useTranslations('rentDetail.gallery');
  const tContent = useTranslations('rentDetail.content');

  // A room is shown by its first photo; rooms without photos are skipped.
  const galleries = GALLERY_ORDER.map((type) => ({
    type,
    slides: (listing.additionals ?? [])
      .filter(
        (additional) => additional.type === type && additional.photos?.length
      )
      .map<Slide>((additional) => ({
        id: additional.id,
        src: additional.photos![0],
        title: additional.name,
        description: additional.description,
        count: additional.photos!.length,
      })),
  })).filter((gallery) => gallery.slides.length > 0);

  const videos = listing.videos ?? [];
  const tours = listing.video360s ?? [];
  const floorPlans = listing.floorPlans ?? [];

  return (
    <>
      {videos.length > 0 && (
        <Section title={tContent('videos')}>
          <div className='grid gap-4 md:grid-cols-2'>
            {videos.map((src) => (
              <video
                key={src}
                src={src}
                controls
                preload='metadata'
                className='w-full rounded bg-ink'
              />
            ))}
          </div>
        </Section>
      )}

      {tours.length > 0 && (
        <Section title={tContent('tour360')}>
          <div className='grid gap-4 md:grid-cols-2'>
            {tours.map((src) => (
              <video
                key={src}
                src={src}
                controls
                preload='metadata'
                className='w-full rounded bg-ink'
              />
            ))}
          </div>
        </Section>
      )}

      {galleries.map((gallery) => (
        <ImageGallerySection
          key={gallery.type}
          title={t(gallery.type)}
          slides={gallery.slides}
        />
      ))}

      {floorPlans.length > 0 && (
        <Section title={tContent('floorPlans')}>
          <div className='grid gap-4 md:grid-cols-2'>
            {floorPlans.map((src) => (
              <Image
                key={src}
                src={src}
                alt={tContent('floorPlans')}
                width={0}
                height={0}
                sizes='100vw'
                className='h-auto w-full rounded border bg-cream object-contain'
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

/** Page background and spacing shared by every detail page's lower half. */
export const MediaShell = ({ children }: { children: React.ReactNode }) => (
  <div className='py-8 bg-bone'>
    <BaseContainer>
      <div className='flex flex-col gap-8 pb-8'>{children}</div>
    </BaseContainer>
  </div>
);

const NearbyVillas = ({ currentId }: { currentId: string }) => {
  const t = useTranslations('rentDetail.gallery');

  const { data } = useVillas({ page: 1, limit: 4 });
  const others = (data?.data.data ?? [])
    .filter((other) => other.id !== currentId)
    .slice(0, 3)
    .map(toVillaCard);

  if (others.length === 0) return null;

  return (
    <Section title={t('nearbyVillas')}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {others.map((other) => (
          <VillaCard
            key={other.id}
            villa={other}
            onFavoriteToggle={() => undefined}
            rentType='rent'
          />
        ))}
      </div>
    </Section>
  );
};

const ContentImage = ({ villa }: { villa: Villa }) => (
  <MediaShell>
    <ListingMedia listing={villa} />
    <NearbyVillas currentId={villa.id} />
  </MediaShell>
);

export default ContentImage;
