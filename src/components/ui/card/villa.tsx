'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaBath, FaHeart, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import { VillaCardModel } from '@/lib/mappers/villa';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNextCustom,
  CarouselPreviousCustom,
} from '@/components/ui/carousel';

/**
 * Accepts both the static constant villas (numeric ids, all stats present) and
 * villas mapped from the API, where `bathrooms`/`maxGuests` are absent because
 * the backend has no such columns.
 */
type VillaCardData = Omit<VillaCardModel, 'id'> & { id: string | number };

interface VillaCardProps {
  villa: VillaCardData;
  onFavoriteToggle: (id: string | number) => void;
  rentType: 'rent' | 'sale';
}

const Stat = ({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: React.ReactNode;
}) => (
  <div className='flex items-center gap-2'>
    <Icon className='text-bronze-600' size={16} />
    <span className='text-sm text-ink'>{value}</span>
  </div>
);

export const VillaCard: React.FC<VillaCardProps> = ({
  villa,
  onFavoriteToggle,
  rentType,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Create a URL-friendly slug from the villa name
  const slug = villa.name.toLowerCase().replace(/\s+/g, '-');

  // Determine the correct link path based on rentType
  const linkPath = rentType === 'rent' ? `/rent/${slug}` : `/buy/${slug}`;

  // Use effect to track carousel state changes
  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentImageIndex(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrentImageIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Link href={linkPath} className='group/card block'>
      <article className='flex h-full flex-col overflow-hidden rounded border border-bronze/20 bg-cream transition-shadow duration-300 hover:shadow-lg'>
        <div className='group relative aspect-[16/10] w-full'>
          <Carousel className='h-full w-full' setApi={setApi}>
            <CarouselContent className='h-full'>
              {villa.images.map((image, index) => (
                <CarouselItem key={index} className='h-full'>
                  <div className='relative aspect-[16/10] w-full'>
                    <Image
                      className='object-cover'
                      src={image}
                      alt={`${villa.name} - Image ${index + 1}`}
                      sizes='(min-width: 1024px) 33vw, 100vw'
                      fill
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className='pointer-events-none absolute inset-0 z-20'>
              <div className='relative flex h-full w-full items-center justify-between'>
                <CarouselPreviousCustom
                  className='pointer-events-auto h-11 w-9 rounded-none border-0 bg-bronze/85 text-cream opacity-0 shadow-none transition-opacity duration-300 hover:bg-bronze group-hover:opacity-100 disabled:opacity-0'
                  variant='ghost'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    api?.scrollPrev();
                  }}
                />
                <CarouselNextCustom
                  className='pointer-events-auto h-11 w-9 rounded-none border-0 bg-bronze/85 text-cream opacity-0 shadow-none transition-opacity duration-300 hover:bg-bronze group-hover:opacity-100 disabled:opacity-0'
                  variant='ghost'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    api?.scrollNext();
                  }}
                />
              </div>
            </div>
          </Carousel>

          {/* Favorite button */}
          <button
            type='button'
            aria-label='Toggle favourite'
            className='absolute right-4 top-4 z-10'
            onClick={(e) => {
              e.preventDefault();
              onFavoriteToggle(villa.id);
            }}
          >
            <FaHeart
              className={
                villa.isFavorite
                  ? 'text-bronze-600 drop-shadow'
                  : 'text-white/90 drop-shadow'
              }
              size={26}
            />
          </button>

          {/* Carousel indicators */}
          {villa.images.length > 1 && (
            <div className='absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2'>
              {villa.images.map((_, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    api?.scrollTo(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/45'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className='flex flex-1 flex-col gap-3 px-5 py-4'>
          <div className='flex items-start justify-between gap-4'>
            <div className='min-w-0'>
              <h3 className='product-title truncate text-ink'>{villa.name}</h3>
              <p className='mt-1 text-sm text-ink-soft'>{villa.location}</p>
            </div>
            <div className='flex shrink-0 flex-col items-end'>
              <span className='price-label text-ink-soft'>
                {rentType === 'rent' ? 'Start from' : 'Price'}
              </span>
              <span className='price-amount text-ink'>{villa.price}</span>
            </div>
          </div>

          <p className='line-clamp-4 text-justify text-[14px] leading-5 text-ink-soft'>
            {villa.description}
          </p>
        </div>

        {/* Stats footer */}
        <div className='flex items-center justify-between gap-3 border-t border-bronze/20 px-5 py-3'>
          <div className='flex items-center gap-4'>
            {villa.bedrooms !== undefined && (
              <Stat icon={IoBed} value={villa.bedrooms} />
            )}
            {villa.bathrooms !== undefined && (
              <Stat icon={FaBath} value={villa.bathrooms} />
            )}
            {villa.maxGuests !== undefined && (
              <Stat icon={FaUser} value={villa.maxGuests} />
            )}
          </div>

          {villa.rating !== undefined && (
            <div className='flex items-center gap-1.5'>
              <Star className='fill-bronze-600 text-bronze-600' size={16} />
              <span className='text-sm font-semibold text-bronze-600'>
                {villa.rating} ratings
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};
