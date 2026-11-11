import React, { useState } from 'react';
import { useTranslations } from 'use-intl';

import BaseContainer from '@/components/layouts/container';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/** Shown when a listing has no photos yet, so the layout never collapses. */
const PLACEHOLDER = '/images/header-landing-page.png';

interface GalleryProps {
  name: string;
  photos: string[];
  videos?: string[] | null;
}

/**
 * Detail-page gallery from the new design: one large frame (the first video
 * when the listing has one, otherwise the first photo) next to a 2x2 grid of
 * thumbnails. "View All Photos" opens every photo in a popup.
 */
const Gallery = ({ name, photos, videos }: GalleryProps) => {
  const t = useTranslations('rentDetail.header');
  const [open, setOpen] = useState(false);

  const images = photos.length > 0 ? photos : [PLACEHOLDER];
  const video = videos?.[0];

  // Thumbnails: the photos after the main one, wrapping if there are fewer than four.
  const start = video ? 0 : 1;
  const thumbs = Array.from({ length: 4 }, (_, index) => {
    const pool = images.length > start ? images.slice(start) : images;
    return pool[index % pool.length];
  });

  return (
    <BaseContainer>
      <>
        <div className='grid gap-3 lg:grid-cols-[1.35fr_1fr]'>
          <div className='relative h-[260px] overflow-hidden rounded bg-ink sm:h-[340px] lg:h-[430px]'>
            {video ? (
              <video
                src={video}
                controls
                muted
                preload='metadata'
                className='h-full w-full object-cover'
              />
            ) : (
              <img
                src={images[0]}
                alt={name}
                className='h-full w-full object-cover'
              />
            )}
          </div>

          <div className='relative hidden grid-cols-2 gap-3 lg:grid lg:h-[430px]'>
            {thumbs.map((src, index) => (
              <button
                key={index}
                type='button'
                onClick={() => setOpen(true)}
                className='overflow-hidden rounded'
                aria-label={t('viewAllPhotos')}
              >
                <img
                  src={src}
                  alt={`${name} ${index + 1}`}
                  loading='lazy'
                  className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
                />
              </button>
            ))}

            <button
              type='button'
              onClick={() => setOpen(true)}
              className='absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/90 px-2 text-center text-xs leading-tight text-cream'
            >
              {t('viewAllPhotos')}
            </button>

            <span className='pointer-events-none absolute bottom-3 right-3 text-xs text-cream drop-shadow'>
              1 / {images.length}
            </span>
          </div>

          {/* Small screens: one button under the main frame instead of the thumbnail grid. */}
          <button
            type='button'
            onClick={() => setOpen(true)}
            className='rounded border border-bronze/40 py-2 text-sm text-bronze-600 lg:hidden'
          >
            {t('viewAllPhotos')} ({images.length})
          </button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className='max-h-[90vh] max-w-5xl overflow-y-auto'>
            <DialogHeader>
              <DialogTitle>{name}</DialogTitle>
              <DialogDescription className='sr-only'>{name}</DialogDescription>
            </DialogHeader>
            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
              {images.map((src, index) => (
                <img
                  key={`${src}-${index}`}
                  src={src}
                  alt={`${name} ${index + 1}`}
                  loading='lazy'
                  className='h-auto w-full rounded object-cover'
                />
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </>
    </BaseContainer>
  );
};

export default Gallery;
