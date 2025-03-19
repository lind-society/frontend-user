'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaBath, FaHeart, FaUser } from 'react-icons/fa6';
import { IoBed } from 'react-icons/io5';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

import { Villa } from '@/modules/landing-page/constant';

// Extracted Villa Card Component with Carousel
interface VillaCardProps {
  villa: Villa;
  onFavoriteToggle: (id: number) => void;
}

// Updating only the VillaCard component
export const VillaCard: React.FC<VillaCardProps> = ({
  villa,
  onFavoriteToggle,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className='flex flex-col shadow-lg rounded-lg overflow-hidden'>
      <div className='relative h-[240px] w-full'>
        <Carousel className='w-full' setApi={setApi}>
          <CarouselContent>
            {villa.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className='relative h-[240px] w-full'>
                  <Image
                    className='w-full h-full object-cover'
                    src={image}
                    alt={`${villa.name} - Image ${index + 1}`}
                    sizes='100vw'
                    width={0}
                    height={0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Favorite button */}
        <button
          className='top-4 right-4 absolute z-10'
          onClick={() => onFavoriteToggle(villa.id)}
        >
          <FaHeart
            className={villa.isFavorite ? 'text-red-500' : 'text-gray-50'}
            size={24}
          />
        </button>

        {/* Rating badge */}
        <div className='absolute left-0 bottom-0 bg-primary px-4 py-2 rounded-tr-lg z-10 flex gap-2 items-center'>
          <Star className='text-white' size={16} />
          <span className='text-white'>{villa.rating}</span>
        </div>

        {/* Carousel indicators - using actual carousel API state */}
        <div className='absolute left-1/2 -translate-x-1/2 bottom-4 z-10 flex gap-2'>
          {villa.images.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full w-2 h-2 transition-all duration-300 ${
                currentImageIndex === index ? 'bg-primary w-4' : 'bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Rest of the card remains the same */}
      <div className='px-4 md:px-6 flex items-center justify-between py-2.5'>
        <p className='text-text text-sm md:text-base'>{villa.location}</p>
        <div className='flex items-center gap-2 md:gap-4'>
          <div className='flex items-center gap-1.5'>
            <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
              <IoBed className='text-primary' size={12} />
            </div>
            <span className='text-sm md:text-base'>{villa.bedrooms}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
              <FaBath className='text-primary' size={12} />
            </div>
            <span className='text-sm md:text-base'>{villa.bathrooms}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <div className='h-5 w-5 md:h-6 md:w-6 bg-tertiary flex items-center justify-center rounded-full'>
              <FaUser className='text-primary' size={12} />
            </div>
            <span className='text-sm md:text-base'>{villa.maxGuests}</span>
          </div>
        </div>
      </div>

      <Separator />

      <div className='px-4 md:px-6 flex flex-col gap-3 md:gap-4 py-2.5'>
        <div className='flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2'>
          <p className='text-lg md:text-xl text-primary font-semibold line-clamp-1'>
            {villa.name}
          </p>
          <div className='flex flex-col text-start md:text-end items-start md:items-end text-primary'>
            <span className='italic text-xs md:text-sm font-normal'>
              Start from
            </span>
            <span className='text-lg md:text-[22px] font-bold whitespace-nowrap'>
              {villa.price}
            </span>
          </div>
        </div>
        <p className='text-gray-600 font-normal text-sm md:text-base line-clamp-3'>
          {villa.description}
        </p>
      </div>
    </div>
  );
};
