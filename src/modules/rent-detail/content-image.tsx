import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Villa } from '@/types/api/villa';

type AdditionalType = NonNullable<Villa['additionals']>[number]['type'];

/** Order the room/area galleries appear in. */
const GALLERY_ORDER: AdditionalType[] = [
  'bedrooms',
  'outdoor_areas',
  'indoor_areas',
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
  photos: string[];
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
  const [opened, setOpened] = useState<Slide | null>(null);

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
                {slide.count > 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    className='self-start'
                    onClick={() => setOpened(slide)}
                  >
                    {t('viewMore')}
                  </Button>
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

      {/* Every photo of the room in a popup, instead of leaving the page. */}
      <Dialog
        open={opened !== null}
        onOpenChange={(open) => !open && setOpened(null)}
      >
        <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {t('allPhotosOf')} {opened?.title}
            </DialogTitle>
            <DialogDescription className='sr-only'>
              {opened?.title}
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
            {opened?.photos.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`${opened.title} ${index + 1}`}
                loading='lazy'
                className='h-auto w-full rounded object-cover'
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  );
};

/** 360° tours and floor plans share one block with a switch; a missing kind is not offered. */
const TourAndFloorPlan = ({
  tours,
  floorPlans,
}: {
  tours: string[];
  floorPlans: string[];
}) => {
  const tContent = useTranslations('rentDetail.content');
  const [view, setView] = useState<'tour' | 'floor'>(
    tours.length > 0 ? 'tour' : 'floor'
  );

  if (tours.length === 0 && floorPlans.length === 0) return null;

  const showTours =
    tours.length > 0 && (view === 'tour' || floorPlans.length === 0);

  return (
    <Section title={showTours ? tContent('tour360') : tContent('floorPlans')}>
      {tours.length > 0 && floorPlans.length > 0 && (
        <div className='flex gap-2' role='tablist'>
          <Button
            type='button'
            role='tab'
            aria-selected={showTours}
            variant={showTours ? 'default' : 'outline'}
            onClick={() => setView('tour')}
          >
            {tContent('tour360')}
          </Button>
          <Button
            type='button'
            role='tab'
            aria-selected={!showTours}
            variant={!showTours ? 'default' : 'outline'}
            onClick={() => setView('floor')}
          >
            {tContent('floorPlans')}
          </Button>
        </div>
      )}

      {showTours ? (
        <div className='grid gap-4 md:grid-cols-2'>
          {tours.map((src) => (
            <TourPlayer key={src} src={src} title={tContent('tour360')} />
          ))}
        </div>
      ) : (
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
      )}
    </Section>
  );
};

/** Video files play natively; anything else is a hosted 360° tour page and goes in a frame. */
const isVideoFile = (url: string) =>
  /\.(mp4|webm|mov|m4v|ogg)(\?|#|$)/i.test(url);

const TourPlayer = ({ src, title }: { src: string; title: string }) =>
  isVideoFile(src) ? (
    <video
      src={src}
      controls
      preload='metadata'
      className='aspect-video w-full rounded bg-ink'
    />
  ) : (
    <iframe
      src={src}
      title={title}
      loading='lazy'
      allow='fullscreen; xr-spatial-tracking; gyroscope; accelerometer'
      allowFullScreen
      className='aspect-video w-full rounded border-0 bg-ink'
    />
  );

type ListingMediaSource = Pick<
  Villa,
  'additionals' | 'videos' | 'video360s' | 'floorPlans'
>;

/** Videos, 360° tours, room galleries and floor plans of one listing. */
export const ListingMedia = ({
  listing,
  hideVideos = false,
}: {
  listing: ListingMediaSource;
  /** The detail page shows the video in its top gallery already. */
  hideVideos?: boolean;
}) => {
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
        photos: additional.photos!,
        count: additional.photos!.length,
      })),
  })).filter((gallery) => gallery.slides.length > 0);

  const videos = listing.videos ?? [];
  const tours = listing.video360s ?? [];
  const floorPlans = listing.floorPlans ?? [];

  return (
    <>
      {!hideVideos && videos.length > 0 && (
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

      <TourAndFloorPlan tours={tours} floorPlans={floorPlans} />

      {galleries.map((gallery) => (
        <ImageGallerySection
          key={gallery.type}
          title={t(gallery.type)}
          slides={gallery.slides}
        />
      ))}
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

const ContentImage = ({ villa }: { villa: Villa }) => (
  <MediaShell>
    <ListingMedia listing={villa} />
  </MediaShell>
);

export default ContentImage;
